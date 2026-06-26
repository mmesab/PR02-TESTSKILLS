// questions.js - Banco de preguntas oficial para IdentityMap Nexus
const questions = [
    // ==========================================
    // FASE 1: MOTIVACIÓN INTERNA (MotivInter)
    // ==========================================
    {
      id: 1,
      text: "¿Qué suele impulsarte más a la hora de iniciar un nuevo proyecto o desafío?", 
      dimension: "MotivInter",
      options: [
        { text: "El reconocimiento externo, el estatus o el éxito del resultado final.", value: 2 },
        { text: "La autosatisfacción, el crecimiento personal y el aprendizaje continuo.", value: 5 },
        { text: "Cumplir de manera rigurosa con un deber o una responsabilidad que me asignaron.", value: 3 },
        { text: "Evitar a toda costa el estancamiento, la rutina o la falta de estímulos.", value: 4 }
      ]
    }, 
    {
      id: 2, 
      text: "Cuando dispones de tiempo libre para ti, tu motivación interna te guía principalmente a:", 
      dimension: "MotivInter",
      options: [
        { text: "Perfeccionar una habilidad, estudiar o desarrollar un hobby personal en profundidad.", value: 5 },
        { text: "Conectar con amigos, apoyar a mi entorno o realizar actividades sociales.", value: 4 },
        { text: "Descansar por completo, desconectar del estrés y buscar comodidad.", value: 2 },
        { text: "Planificar mis metas estratégicas y objetivos para las semanas siguientes.", value: 3 }
      ]
    },
    {
      id: 3, 
      text: "Cuando algo en lo que has puesto mucho esfuerzo no sale como esperabas:",
      dimension: "MotivInter",
      options: [
        { text: "Me frustro, pero analizo internamente qué falló para corregirlo de inmediato.", value: 5 },
        { text: "Busco apoyo emocional o validación en los demás para recuperar el entusiasmo.", value: 4 },
        { text: "Me desmotivo con facilidad, me cuesta volver a empezar y suelo perder el interés.", value: 1 },
        { text: "Cambio rápidamente de objetivo hacia algo que me resulte más seguro y controlado.", value: 2 }
      ]
    },
    {
      id: 4, 
      text: "¿Qué situación o pensamiento suele preocuparte o inquietarte más en tu día a día?", 
      dimension: "MotivInter",
      options: [
        { text: "Sentir que no estoy aprovechando al máximo mi potencial o mis talentos internos.", value: 5 },
        { text: "Defraudar las expectativas del resto de personas o perder su aprobación.", value: 3 },
        { text: "Perder la estabilidad económica, el orden o la certidumbre de mi entorno.", value: 2 },
        { text: "La monotonía, el aburrimiento o la falta de proyectos dinámicos y novedosos.", value: 4 }
      ]
    }, 
    {
      id: 5, 
      text: "¿Qué frase describe mejor el motor o impulso principal de tus acciones en la vida?", 
      dimension: "MotivInter",
      options: [
        { text: "La búsqueda constante de la excelencia, el conocimiento y la verdad.", value: 5 },
        { text: "Dejar un impacto positivo, ayudar y transformar la vida de las personas.", value: 4 },
        { text: "Alcanzar una posición de seguridad, paz, estabilidad y confort a largo plazo.", value: 2 },
        { text: "Vivir experiencias intensas, variadas, desafiantes y en constante evolución.", value: 3 }
      ]
    },

    // ==========================================
    // FASE 2: RELACIÓN CON EL ENTORNO (RelacionEntorno)
    // ==========================================
    {
      id: 6, 
      text: "Cuando entras a formar parte de un grupo o entorno social completamente nuevo:", 
      dimension: "RelacionEntorno",
      options: [
        { text: "Observo detenidamente desde una distancia prudencial antes de actuar o hablar.", value: 4 },
        { text: "Tomo la iniciativa de inmediato, me presento y busco dinamizar el ambiente.", value: 5 },
        { text: "Busco pasar desapercibido y adaptarme al ritmo que el grupo ya tenga establecido.", value: 2 },
        { text: "Me acerco primero a una sola persona para establecer un vínculo cómodo y seguro.", value: 3 }
      ]
    },
    {
      id: 7, 
      text: "A la hora de adaptarte a las normas, directrices o dinámicas de tu entorno actual:", 
      dimension: "RelacionEntorno",
      options: [
        { text: "Las sigo estrictamente porque entiendo que garantizan el orden común.", value: 4 },
        { text: "Las cuestiono de manera constructiva si considero que pueden mejorarse u optimizarse.", value: 5 },
        { text: "Me adapto de forma natural y fluida sin que me suponga ningún esfuerzo mental.", value: 3 },
        { text: "Me cuesta encajar con las imposiciones externas y busco mantener mi propio criterio.", value: 2 }
      ]
    },
    {
      id: 8, 
      text: "Cuando se genera un conflicto visible o tensión de opiniones a tu alrededor:", 
      dimension: "RelacionEntorno",
      options: [
        { text: "Intervengo de forma activa y directa para mediar, calmar los ánimos y buscar la paz.", value: 4 },
        { text: "Expongo mis argumentos de forma firme y racional para defender la postura correcta.", value: 5 },
        { text: "Prefiero mantenerme al margen y esperar a que el agua vuelva a su cauce por sí sola.", value: 2 },
        { text: "Me afecta a nivel emocional y busco proteger la armonía de mis personas cercanas.", value: 3 }
      ]
    },
    {
      id: 9, 
      text: "¿Cómo mides el impacto o el éxito de tu presencia en los entornos donde te desenvuelves?", 
      dimension: "RelacionEntorno",
      options: [
        { text: "Por el nivel de respeto, liderazgo y autoridad que logro consolidar.", value: 4 },
        { text: "Por el valor real, la ayuda y el soporte que aporto a los miembros del entorno.", value: 5 },
        { text: "Por la tranquilidad y la ausencia de problemas o roces que logro mantener.", value: 2 },
        { text: "Por los resultados técnicos, objetivos y medibles que alcanzamos juntos.", value: 3 }
      ]
    },
    {
      id: 10, 
      text: "Cuando el entorno social o profesional te exige un cambio drástico e inesperado:", 
      dimension: "RelacionEntorno",
      options: [
        { text: "Lo asumo rápidamente como una excelente oportunidad para innovar y destacar.", value: 5 },
        { text: "Me resisto inicialmente mientras analizo los riesgos, la seguridad y el porqué del cambio.", value: 2 },
        { text: "Me ajusto con paciencia, priorizando que la transición no dañe las relaciones humanas.", value: 3 },
        { text: "Diseño un plan estructurado paso a paso para ejecutar la adaptación con la mayor eficiencia.", value: 4 }
      ]
    },

    // ==========================================
    // FASE 3: ESTRÉS Y ADAPTACIÓN (EstresAdaptacion)
    // ==========================================
    {
      id: 11, 
      text: "Cuando te encuentras bajo una situación de alta presión o plazos de tiempo muy ajustados:", 
      dimension: "EstresAdaptacion",
      options: [
        { text: "Me enfoco de forma hiperconcentrada en la tarea, dejando de lado todo lo accesorio.", value: 5 },
        { text: "Me bloqueo o me domina la ansiedad, lo que dificulta mi toma de decisiones clara.", value: 1 },
        { text: "Busco delegar, pedir ayuda o distribuir la carga para no saturarme en solitario.", value: 3 },
        { text: "Intento mantener la calma exterior controlando de manera metódica cada detalle.", value: 4 }
      ]
    },
    {
      id: 12, 
      text: "Frente a un cambio radical de planes de última hora que rompe tu esquema estructurado:", 
      dimension: "EstresAdaptacion",
      options: [
        { text: "Me adapto con agilidad, improviso soluciones creativas y disfruto del reto.", value: 5 },
        { text: "Me genera un gran malestar, estrés o frustración debido a la pérdida de control.", value: 2 },
        { text: "Acepto la situación con resignación y espero instrucciones de cómo proceder.", value: 3 },
        { text: "Me detengo a reorganizar de forma analítica un nuevo plan de acción alternativo.", value: 4 }
      ]
    }, 
    {
      id: 13, 
      text: "Cuando un asunto o decisión importante te genera un alto nivel de incertidumbre:", 
      dimension: "EstresAdaptacion",
      options: [
        { text: "Investigo exhaustivamente y busco datos objetivos para minimizar cualquier riesgo.", value: 5 },
        { text: "Aposto por mi intuición y actúo con valentía asumiendo las consecuencias directas.", value: 4 },
        { text: "Pospongo la decisión (procrastino) esperando que el panorama se aclare por sí mismo.", value: 2 },
        { text: "Consulto la opinión de personas de mi total confianza para compartir la responsabilidad.", value: 3 }
      ]
    }, 
    {
      id: 14, 
      text: "¿Qué factor o condición es la que te proporciona mayor seguridad en momentos de crisis?", 
      dimension: "EstresAdaptacion",
      options: [
        { text: "Contar con un fondo de recursos, ahorros o un plan B perfectamente estructurado.", value: 4 },
        { text: "Tener la absoluta certeza de que poseo los conocimientos técnicos para resolverlo.", value: 5 },
        { text: "Saber que cuento con un equipo humano sólido, unido y leal que me respalda.", value: 3 },
        { text: "Mi propia confianza interna en que siempre salgo adelante ante cualquier escenario.", value: 2 }
      ]
    }, 
    {
      id: 15, 
      text: "¿Qué describe mejor la reacción interna inconsciente que experimentas bajo estrés severo?", 
      dimension: "EstresAdaptacion",
      options: [
        { text: "Me vuelvo más exigente, impaciente, perfeccionista y crítico con el entorno.", value: 4 },
        { text: "Me vuelvo complaciente, evito la confrontación y busco agradar para mantener la paz.", value: 3 },
        { text: "Me aíslo por completo del mundo exterior para procesar mis pensamientos a solas.", value: 5 },
        { text: "Me hiperactivo, salto de una idea a otra buscando opciones desesperadamente.", value: 2 }
      ]
    },

    // ==========================================
    // FASE 4: RELACIONES PERSONALES (RelPersonales)
    // ==========================================
    {
      id: 16, 
      text: "Cuando una persona muy cercana a ti pasa por un momento difícil o un problema grave:", 
      dimension: "RelPersonales",
      options: [
        { text: "Le ofrezco soluciones lógicas, prácticas y directas para resolver el problema ya.", value: 4 },
        { text: "Escucho con empatía profunda, valido sus sentimientos y le brindo contención emocional.", value: 5 },
        { text: "Le doy su espacio respetando su privacidad hasta que decida hablar si lo desea.", value: 3 },
        { text: "Intento animarle, cambiar de tema o buscar actividades para distraer su mente.", value: 2 }
      ]
    }, 
    {
      id: 17,
      text: "¿Cómo gestionas el establecimiento de límites en tus relaciones humanas diarias?", 
      dimension: "RelPersonales",
      options: [
        { text: "Me resulta natural y digo 'no' de forma asertiva cuando algo invade mi espacio o tiempo.", value: 5 },
        { text: "Me cuesta mucho decir 'no' por temor a herir, causar tensiones o alejar a la otra persona.", value: 2 },
        { text: "Establezco límites de manera rígida y distante para evitar que se aprovechen de mí.", value: 4 },
        { text: "Negocio los límites de forma flexible buscando siempre un acuerdo intermedio cómodo.", value: 3 }
      ]
    }, 
    {
      id: 18, 
      text: "¿Qué cualidad o valor estimas y priorizas más en tus relaciones interpersonales?", 
      dimension: "RelPersonales",
      options: [
        { text: "La lealtad incondicional, la transparencia y el apoyo mutuo en las malas.", value: 4 },
        { text: "La honestidad intelectual, la profundidad en las conversaciones y la autenticidad.", value: 5 },
        { text: "La armonía, el buen sentido del humor, la ligereza y la ausencia de dramas.", value: 2 },
        { text: "El crecimiento compartido, la admiración mutua y el impulso hacia metas.", value: 3 }
      ]
    }, 
    {
      id: 19,
      text: "Cuando alguien en quien habías depositado tu total confianza te defrauda o rompe un acuerdo:", 
      dimension: "RelPersonales",
      options: [
        { text: "Expreso mi enfado claramente, pido explicaciones e intento reparar el vínculo.", value: 3 },
        { text: "Corto la relación de forma tajante y definitiva, retirándole mi confianza para siempre.", value: 5 },
        { text: "Suelo perdonar con relativa facilidad minimizando el error para evitar el conflicto.", value: 2 },
        { text: "Me distancio emocionalmente de manera gradual mientras analizo fríamente lo sucedido.", value: 4 }
      ]
    }, 
    {
      id: 20, 
      text: "A la hora de vincularte afectiva o profesionalmente, tu estilo tiende a ser:", 
      dimension: "RelPersonales",
      options: [
        { text: "Muy selectivo: prefiero pocos vínculos pero extremadamente profundos y reales.", value: 5 },
        { text: "Abierto y extenso: disfruto conocer a muchas personas y mantener una red amplia.", value: 3 },
        { text: "Independiente: mantengo cierta distancia protegiendo firmemente mi autonomía.", value: 4 },
        { text: "Cercano y protector: tiendo a cuidar, guiar y velar por el bienestar de los míos.", value: 2 }
      ]
    },

    // ==========================================
    // FASE 5: TRABAJO Y OBJETIVOS (TrabajoObjetivos)
    // ==========================================
    {
      id: 21, 
      text: "En el desarrollo de proyectos profesionales o de estudio, tú normalmente destacas por:", 
      dimension: "TrabajoObjetivos",
      options: [
        { text: "Tu visión estratégica, orientación al logro y empuje para cumplir metas ambiciosas.", value: 4 },
        { text: "Tu precisión técnica, atención al detalle y obsesión por la calidad y el orden.", value: 5 },
        { text: "Tu capacidad para fomentar la cohesión de equipo, el consenso y el buen clima.", value: 3 },
        { text: "Tu creatividad desbordante, aportando ideas disruptivas e innovaciones fuera de la caja.", value: 2 }
      ]
    }, 
    {
      id: 22, 
      text: "¿Cómo defines y organizas la planificación de tus metas y objetivos a mediano plazo?", 
      dimension: "TrabajoObjetivos",
      options: [
        { text: "Escribo planes sumamente detallados con subtareas, métricas y plazos rigurosos.", value: 5 },
        { text: "Tengo claros los objetivos generales en mi mente, pero prefiero improvisar el día a día.", value: 2 },
        { text: "Establezco metas dinámicas que comparto con mi entorno para mantener el compromiso.", value: 3 },
        { text: "Me enfoco en un solo gran objetivo clave y no paro hasta derribar todos los obstáculos.", value: 4 }
      ]
    },
    {
      id: 23, 
      text: "Frente a tareas rutinarias, repetitivas o meramente burocráticas dentro de tu labor:", 
      dimension: "TrabajoObjetivos",
      options: [
        { text: "Las ejecuto de forma impecable y rápida porque entiendo que son parte del deber.", value: 4 },
        { text: "Me aburro soberanamente, las pospongo o busco automatizarlas de forma creativa.", value: 5 },
        { text: "Las realizo sin quejas, manteniendo un ritmo constante, pausado y tranquilo.", value: 3 },
        { text: "Me cuesta concentrarme en ellas y prefiero delegarlas para enfocarme en la estrategia.", value: 2 }
      ]
    },
    {
      id: 24, 
      text: "Cuando lideras una iniciativa o te corresponde coordinar el trabajo de otras personas:", 
      dimension: "TrabajoObjetivos",
      options: [
        { text: "Superviso con firmeza el cumplimiento estricto de las directrices y la calidad.", value: 5 },
        { text: "Delego con total libertad confiando plenamente en la autonomía de cada profesional.", value: 2 },
        { text: "Motivo e inspiro al equipo mediante una visión apasionante del impacto final.", value: 4 },
        { text: "Me aseguro de que todos se sientan escuchados y cómodos en sus respectivos roles.", value: 3 }
      ]
    },
    {
      id: 25, 
      text: "¿Cuál consideras que es el mayor riesgo o defecto en tu estilo actual de trabajo?", 
      dimension: "TrabajoObjetivos",
      options: [
        { text: "El perfeccionismo excesivo que a veces ralentiza las entregas por refinar detalles.", value: 5 },
        { text: "La autoexigencia desmedida que me empuja al borde del agotamiento (burnout).", value: 4 },
        { text: "La tendencia a dispersarme al iniciar múltiples iniciativas atractivas sin terminar la anterior.", value: 2 },
        { text: "Priorizar a veces el consenso grupal retrasando decisiones operativas firmes.", value: 3 }
      ]
    }
];