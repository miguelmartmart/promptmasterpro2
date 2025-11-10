# Guía de Configuración: n8n con AWS Transcribe

## Índice
1. [Introducción](#introducción)
2. [Obtener Credenciales de AWS](#obtener-credenciales-de-aws)
3. [Configurar el Nodo de Transcribe en n8n](#configurar-el-nodo-de-transcribe-en-n8n)
4. [Permisos Necesarios](#permisos-necesarios)
5. [Resolución de Problemas](#resolución-de-problemas)
6. [Mejores Prácticas de Seguridad](#mejores-prácticas-de-seguridad)

## Introducción

Esta guía te ayudará a configurar el nodo de AWS Transcribe en n8n para transcribir audio a texto. AWS Transcribe es un servicio de reconocimiento de voz automático que facilita la conversión de archivos de audio en texto.

### ¿Qué NO necesitas?

El menú de **API Gateway** que mencionas (API HTTP, API de WebSocket, API REST, etc.) **NO es necesario** para usar AWS Transcribe. API Gateway es un servicio diferente de AWS que se usa para crear y gestionar APIs REST y WebSocket. Para usar AWS Transcribe con n8n, solo necesitas:
- Credenciales de AWS (Access Key ID y Secret Access Key)
- Permisos adecuados para el servicio Transcribe

## Obtener Credenciales de AWS

### Paso 1: Acceder a IAM (Identity and Access Management)

1. Inicia sesión en la [Consola de AWS](https://console.aws.amazon.com)
2. En la barra de búsqueda superior, escribe **IAM** y selecciona "IAM" en los resultados
3. En el panel lateral izquierdo, haz clic en **"Users"** (Usuarios)

### Paso 2: Crear un Usuario IAM (si no tienes uno)

1. Haz clic en **"Add users"** (Agregar usuarios) o **"Create user"** (Crear usuario)
2. Ingresa un nombre para el usuario (por ejemplo: `n8n-transcribe-user`)
3. En "Select AWS credential type", marca la casilla **"Access key - Programmatic access"** (Clave de acceso - Acceso programático)
4. Haz clic en **"Next: Permissions"** (Siguiente: Permisos)

### Paso 3: Asignar Permisos para Transcribe

Tienes dos opciones para asignar permisos:

#### Opción A: Política Administrada (Más Fácil, Menos Segura)
1. Selecciona **"Attach existing policies directly"** (Adjuntar políticas existentes directamente)
2. Busca y selecciona **"AmazonTranscribeFullAccess"**
3. Haz clic en **"Next"** hasta llegar a "Review" y luego en **"Create user"**

#### Opción B: Política Personalizada (Más Segura, Recomendada)
1. Selecciona **"Create policy"** (Crear política)
2. Selecciona la pestaña **"JSON"**
3. Pega la siguiente política mínima:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "transcribe:StartTranscriptionJob",
                "transcribe:GetTranscriptionJob",
                "transcribe:ListTranscriptionJobs",
                "transcribe:DeleteTranscriptionJob"
            ],
            "Resource": "*"
        },
        {
            "Effect": "Allow",
            "Action": [
                "s3:GetObject",
                "s3:PutObject"
            ],
            "Resource": "arn:aws:s3:::tu-bucket-nombre/*"
        }
    ]
}
```

> **Nota**: Reemplaza `tu-bucket-nombre` con el nombre de tu bucket de S3 donde almacenarás los archivos de audio.

4. Haz clic en **"Next: Tags"** (opcional), luego **"Next: Review"**
5. Asigna un nombre a la política (ej: `N8nTranscribePolicy`)
6. Haz clic en **"Create policy"**
7. Vuelve a la creación del usuario y adjunta esta política personalizada

### Paso 4: Obtener las Credenciales

1. Después de crear el usuario, verás una página que muestra:
   - **Access key ID** (ID de la clave de acceso) - ejemplo: `AKIAIOSFODNN7EXAMPLE`
   - **Secret access key** (Clave de acceso secreta) - ejemplo: `wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY`

2. **¡IMPORTANTE!**: Esta es la **única vez** que podrás ver la Secret Access Key. Descárgala o cópiala de forma segura.

3. Puedes:
   - Hacer clic en **"Download .csv"** para guardar las credenciales
   - Copiar manualmente ambas claves a un gestor de contraseñas seguro

### Alternativa: Usar un Usuario Existente

Si ya tienes un usuario IAM:

1. Ve a **IAM** → **Users** → Selecciona tu usuario
2. Ve a la pestaña **"Security credentials"** (Credenciales de seguridad)
3. En la sección **"Access keys"**, haz clic en **"Create access key"** (Crear clave de acceso)
4. Selecciona el caso de uso: **"Application running outside AWS"** o **"Third-party service"**
5. Haz clic en **"Next"**, luego **"Create access key"**
6. Guarda el **Access Key ID** y **Secret Access Key**

## Configurar el Nodo de Transcribe en n8n

### Paso 1: Agregar Credenciales en n8n

1. Abre tu instancia de n8n
2. Ve a **Settings** → **Credentials** (o haz clic en el ícono de engranaje)
3. Haz clic en **"+ Add Credential"** (Agregar credencial)
4. Busca y selecciona **"AWS"** (no busques "Transcribe" específicamente, las credenciales de AWS son genéricas)
5. Completa los campos:
   - **Credential Name**: Asigna un nombre descriptivo (ej: "AWS Transcribe Credentials")
   - **Access Key ID**: Pega el Access Key ID de AWS
   - **Secret Access Key**: Pega el Secret Access Key de AWS
   - **Region**: Selecciona la región donde quieres usar Transcribe (ej: `us-east-1`, `us-west-2`, `eu-west-1`)
6. Haz clic en **"Save"** (Guardar)

### Paso 2: Usar el Nodo AWS Transcribe

1. En tu workflow de n8n, haz clic en el botón **"+"** para agregar un nodo
2. Busca **"AWS Transcribe"** en la lista de nodos
3. Selecciona el nodo **"AWS Transcribe"**
4. Configura el nodo:

   **Campos principales:**
   - **Credential to connect with**: Selecciona las credenciales de AWS que creaste
   - **Resource**: Selecciona **"Job"** (trabajo de transcripción)
   - **Operation**: Selecciona la operación deseada:
     - **"Create"**: Iniciar un nuevo trabajo de transcripción
     - **"Get"**: Obtener el estado de un trabajo
     - **"Get All"**: Listar todos los trabajos
     - **"Delete"**: Eliminar un trabajo

   **Para crear un trabajo de transcripción (Operation: Create):**
   - **Job Name**: Nombre único para el trabajo (ej: `transcription-{{$json["id"]}}`)
   - **Media File URI**: URL de S3 del archivo de audio (ej: `s3://mi-bucket/audio.mp3`)
   - **Language Code**: Código de idioma (ej: `es-ES` para español de España, `es-US` para español de EE.UU., `en-US` para inglés)
   - **Output Bucket**: (Opcional) Bucket de S3 para guardar el resultado
   - **Additional Fields**: Puedes configurar opciones adicionales como:
     - **Media Format**: Formato del archivo (mp3, mp4, wav, flac)
     - **Show Speaker Labels**: Para identificar diferentes hablantes
     - **Max Speaker Labels**: Número máximo de hablantes a identificar

### Paso 3: Ejemplo de Workflow Completo

Un workflow típico podría ser:

```
1. Trigger (Webhook, Schedule, etc.)
   ↓
2. Nodo para subir archivo a S3 (AWS S3 node)
   ↓
3. AWS Transcribe node (Create Job)
   ↓
4. Wait node (esperar unos segundos)
   ↓
5. AWS Transcribe node (Get Job) - para verificar el estado
   ↓
6. IF node - verificar si el trabajo está completo
   ↓
7. Procesar el resultado de la transcripción
```

## Permisos Necesarios

Para que AWS Transcribe funcione correctamente, el usuario IAM necesita:

### Permisos de Transcribe
- `transcribe:StartTranscriptionJob` - Iniciar trabajos de transcripción
- `transcribe:GetTranscriptionJob` - Obtener estado de trabajos
- `transcribe:ListTranscriptionJobs` - Listar trabajos
- `transcribe:DeleteTranscriptionJob` - Eliminar trabajos (opcional)

### Permisos de S3 (Requeridos)
AWS Transcribe necesita acceso a S3 para:
- Leer archivos de audio de entrada
- Escribir resultados de transcripción

```json
{
    "Effect": "Allow",
    "Action": [
        "s3:GetObject",
        "s3:ListBucket",
        "s3:PutObject"
    ],
    "Resource": [
        "arn:aws:s3:::tu-bucket-nombre",
        "arn:aws:s3:::tu-bucket-nombre/*"
    ]
}
```

## Resolución de Problemas

### Error: "InvalidAccessKeyId"
**Problema**: El Access Key ID no es válido o está mal escrito.
**Solución**: 
- Verifica que copiaste correctamente el Access Key ID
- Asegúrate de que no haya espacios adicionales al inicio o final
- Verifica que el usuario IAM no haya sido eliminado

### Error: "SignatureDoesNotMatch"
**Problema**: El Secret Access Key es incorrecto.
**Solución**: 
- Verifica que copiaste correctamente el Secret Access Key
- Si no estás seguro, genera un nuevo par de claves en IAM

### Error: "AccessDenied" o "UnauthorizedOperation"
**Problema**: El usuario IAM no tiene permisos suficientes.
**Solución**: 
- Ve a IAM → Users → Tu usuario → Permissions
- Verifica que tenga la política `AmazonTranscribeFullAccess` o una política personalizada con los permisos necesarios
- Asegúrate de que también tenga permisos de S3

### Error: "BadRequestException: The media format is not supported"
**Problema**: El formato del archivo de audio no es compatible.
**Solución**: 
- AWS Transcribe soporta: MP3, MP4, WAV, FLAC, AMR, OGG, WebM
- Convierte tu archivo al formato adecuado
- Especifica correctamente el parámetro "Media Format" en el nodo

### Error: "The S3 object does not exist"
**Problema**: AWS Transcribe no puede encontrar el archivo de audio en S3.
**Solución**: 
- Verifica que la URI de S3 sea correcta (formato: `s3://bucket-name/path/to/file.mp3`)
- Asegúrate de que el archivo realmente exista en S3
- Verifica que el usuario IAM tenga permisos de lectura en ese bucket

### El trabajo se queda en estado "IN_PROGRESS"
**Problema**: El trabajo de transcripción está procesando.
**Solución**: 
- Los trabajos de transcripción pueden tomar varios minutos dependiendo de la duración del audio
- Usa un nodo "Wait" o implementa polling para verificar el estado periódicamente
- Regla general: ~1 minuto de procesamiento por cada minuto de audio

## Mejores Prácticas de Seguridad

### 1. Principio de Mínimo Privilegio
- No uses credenciales de root de AWS
- Crea usuarios IAM específicos para cada aplicación
- Asigna solo los permisos necesarios

### 2. Rotación de Credenciales
- Rota las Access Keys regularmente (cada 90 días es recomendado)
- Elimina las claves antiguas después de rotar

### 3. Almacenamiento Seguro
- Nunca compartas las credenciales en código fuente
- No las subas a repositorios de Git
- Usa variables de entorno o gestores de secretos
- En n8n, las credenciales se almacenan encriptadas

### 4. Monitoreo
- Activa AWS CloudTrail para auditar el uso de las credenciales
- Configura alertas para actividades sospechosas
- Revisa regularmente los logs de acceso

### 5. Usar Roles IAM cuando sea Posible
Si n8n está ejecutándose en AWS (EC2, ECS, Lambda):
- Usa Roles IAM en lugar de Access Keys
- Los roles son más seguros y no requieren gestión manual de credenciales
- Las credenciales temporales se rotan automáticamente

### 6. Configurar Políticas de Bucket S3
Asegúrate de que tu bucket S3 tenga las políticas correctas:

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowTranscribeRead",
            "Effect": "Allow",
            "Principal": {
                "Service": "transcribe.amazonaws.com"
            },
            "Action": [
                "s3:GetObject",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::tu-bucket-nombre",
                "arn:aws:s3:::tu-bucket-nombre/*"
            ]
        }
    ]
}
```

## Recursos Adicionales

### Documentación Oficial
- [AWS Transcribe - Guía del desarrollador](https://docs.aws.amazon.com/transcribe/latest/dg/what-is-transcribe.html)
- [n8n - AWS Transcribe Node](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.awstranscribe/)
- [IAM - Mejores prácticas de seguridad](https://docs.aws.amazon.com/IAM/latest/UserGuide/best-practices.html)

### Precios de AWS Transcribe
- [Página de precios de AWS Transcribe](https://aws.amazon.com/transcribe/pricing/)
- AWS Transcribe cobra por segundo de audio transcrito
- Hay una capa gratuita disponible para nuevos usuarios (primeros 12 meses)

### Soporte de Idiomas
- [Idiomas soportados por AWS Transcribe](https://docs.aws.amazon.com/transcribe/latest/dg/supported-languages.html)
- Español: `es-ES` (España), `es-US` (EE.UU.)
- Inglés: `en-US`, `en-GB`, `en-AU`, etc.
- Más de 100 idiomas y dialectos disponibles

## Conclusión

Ahora deberías poder configurar correctamente el nodo de AWS Transcribe en n8n. Recuerda:

1. ✅ **Necesitas**: Access Key ID y Secret Access Key de IAM (no API Gateway)
2. ✅ **Permisos**: Para AWS Transcribe y S3
3. ✅ **Configuración**: Credenciales en n8n y el nodo configurado correctamente
4. ✅ **Seguridad**: Aplica las mejores prácticas de seguridad

Si tienes problemas, consulta la sección de [Resolución de Problemas](#resolución-de-problemas) o la documentación oficial de AWS y n8n.

---

**Nota**: Esta guía fue creada para ayudarte a integrar servicios externos con PromptCraft Pro. Las credenciales de AWS son personales y no deben compartirse con el repositorio de código.
