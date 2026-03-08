#!/usr/bin/env python3
"""Genera propuesta comercial en PDF para AutoPartes."""

from fpdf import FPDF
from datetime import date

class PropuestaPDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 22)
        self.set_text_color(31, 41, 55)  # gray-800
        self.cell(0, 12, "AutoPartes", align="L")
        self.ln(10)
        self.set_draw_color(59, 130, 246)  # blue-500
        self.set_line_width(0.8)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(8)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(156, 163, 175)
        self.cell(0, 10, f"AutoPartes - Propuesta Comercial - P\u00e1g {self.page_no()}/{{nb}}", align="C")

    def section_title(self, title):
        self.ln(4)
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(59, 130, 246)
        self.cell(0, 10, title)
        self.ln(10)

    def body_text(self, text):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(55, 65, 81)
        self.multi_cell(0, 6, text)
        self.ln(2)

    def bullet(self, bold_prefix, text=""):
        self.set_font("Helvetica", "", 10)
        self.set_text_color(55, 65, 81)
        self.cell(8, 6, "-")
        if text:
            # bold_prefix is the bold label, text is the description
            self.set_font("Helvetica", "B", 10)
            self.cell(self.get_string_width(bold_prefix) + 1, 6, bold_prefix)
            self.set_font("Helvetica", "", 10)
            self.multi_cell(0, 6, text)
        else:
            # single argument = just regular text
            self.multi_cell(0, 6, bold_prefix)
        self.ln(1)


def generar():
    pdf = PropuestaPDF()
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(auto=True, margin=20)
    pdf.add_page()

    hoy = date.today().strftime("%d/%m/%Y")

    # Titulo principal
    pdf.set_font("Helvetica", "B", 20)
    pdf.set_text_color(31, 41, 55)
    pdf.ln(5)
    pdf.cell(0, 12, "Propuesta Comercial", align="C")
    pdf.ln(10)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(107, 114, 128)
    pdf.cell(0, 8, "Sistema de Gesti\u00f3n de Solicitudes de Repuestos con IA", align="C")
    pdf.ln(6)
    pdf.cell(0, 8, f"Fecha: {hoy}", align="C")
    pdf.ln(12)

    # ---- Que es AutoPartes ----
    pdf.section_title("1. \u00bfQu\u00e9 es AutoPartes?")
    pdf.body_text(
        "AutoPartes es un sistema web inteligente dise\u00f1ado para la gesti\u00f3n de "
        "solicitudes de repuestos automotrices. Permite a los vendedores registrar "
        "solicitudes en lenguaje natural y utiliza inteligencia artificial para "
        "normalizar, categorizar y analizar la demanda de repuestos en tiempo real."
    )

    # ---- Funcionalidades ----
    pdf.section_title("2. Funcionalidades Incluidas")

    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(31, 41, 55)
    pdf.cell(0, 7, "Registro Inteligente de Solicitudes")
    pdf.ln(7)
    pdf.bullet("Entrada en lenguaje natural: ", "los vendedores describen el repuesto como lo har\u00edan verbalmente.")
    pdf.bullet("Normalizaci\u00f3n autom\u00e1tica con IA: ", "extrae marca, modelo, a\u00f1o, pieza y categor\u00eda.")
    pdf.bullet("Glosario venezolano integrado: ", "reconoce t\u00e9rminos locales (caucho, pila, banditas, etc.).")
    pdf.ln(2)

    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(31, 41, 55)
    pdf.cell(0, 7, "Gesti\u00f3n Multi-Sede")
    pdf.ln(7)
    pdf.bullet("Cada sede opera de forma independiente con sus propios vendedores.")
    pdf.bullet("El administrador tiene visi\u00f3n global de todas las sedes.")
    pdf.bullet("Segregaci\u00f3n de datos: ", "cada vendedor solo ve la informaci\u00f3n de su sede.")
    pdf.ln(2)

    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(31, 41, 55)
    pdf.cell(0, 7, "Panel de Anal\u00edtica")
    pdf.ln(7)
    pdf.bullet("Gr\u00e1ficos de demanda por categor\u00eda, marca, sede y tendencia mensual.")
    pdf.bullet("Top de repuestos m\u00e1s solicitados.")
    pdf.bullet("Patrones de demanda por ubicaci\u00f3n.")
    pdf.ln(2)

    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(31, 41, 55)
    pdf.cell(0, 7, "Chat con Inteligencia Artificial")
    pdf.ln(7)
    pdf.bullet("Asistente de IA para consultar tendencias y recomendaciones de compra.")
    pdf.bullet("Preguntas como: ", "\"\u00bfQu\u00e9 repuestos deber\u00eda comprar para la Sede Principal?\"")
    pdf.ln(2)

    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(31, 41, 55)
    pdf.cell(0, 7, "Seguridad y Control de Acceso")
    pdf.ln(7)
    pdf.bullet("Roles diferenciados: ", "Administrador y Vendedor.")
    pdf.bullet("Autenticaci\u00f3n segura con contrase\u00f1as encriptadas.")
    pdf.bullet("Sesiones protegidas con JWT.")
    pdf.ln(4)

    # ---- Inversion ----
    pdf.section_title("3. Inversi\u00f3n")

    # Tabla de precios
    pdf.set_font("Helvetica", "B", 10)
    col_w = [90, 90]

    # Header de tabla
    pdf.set_fill_color(59, 130, 246)
    pdf.set_text_color(255, 255, 255)
    pdf.cell(col_w[0], 9, "  Concepto", border=1, fill=True)
    pdf.cell(col_w[1], 9, "  Precio", border=1, fill=True)
    pdf.ln()

    # Filas
    rows = [
        ("Setup inicial (\u00fanico pago)", "$150.00"),
        ("Mensualidad por sede (1-2 sedes)", "$50.00 / mes"),
        ("Mensualidad por sede (3+ sedes)", "$40.00 / mes"),
        ("M\u00e1s de 5 sedes", "Contactar para plan especial"),
    ]
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(55, 65, 81)
    for i, (concepto, precio) in enumerate(rows):
        if i % 2 == 0:
            pdf.set_fill_color(239, 246, 255)
        else:
            pdf.set_fill_color(255, 255, 255)
        pdf.cell(col_w[0], 9, "  " + concepto, border=1, fill=True)
        pdf.cell(col_w[1], 9, "  " + precio, border=1, fill=True)
        pdf.ln()

    pdf.ln(6)

    # Ejemplos
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(31, 41, 55)
    pdf.cell(0, 7, "Ejemplos de inversi\u00f3n:")
    pdf.ln(8)

    # Tabla de ejemplos
    pdf.set_font("Helvetica", "B", 10)
    col_e = [60, 40, 40, 40]
    pdf.set_fill_color(59, 130, 246)
    pdf.set_text_color(255, 255, 255)
    for h, w in zip(["  Perfil", "  Setup", "  Mensual", "  Anual"], col_e):
        pdf.cell(w, 9, h, border=1, fill=True)
    pdf.ln()

    ejemplos = [
        ("1 sede", "$150", "$50", "$750"),
        ("2 sedes", "$150", "$100", "$1,350"),
        ("3 sedes", "$150", "$120", "$1,590"),
        ("5 sedes", "$150", "$200", "$2,550"),
    ]
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(55, 65, 81)
    for i, (perfil, setup, mensual, anual) in enumerate(ejemplos):
        if i % 2 == 0:
            pdf.set_fill_color(239, 246, 255)
        else:
            pdf.set_fill_color(255, 255, 255)
        for val, w in zip([perfil, setup, mensual, anual], col_e):
            pdf.cell(w, 9, "  " + val, border=1, fill=True)
        pdf.ln()

    pdf.ln(4)
    pdf.set_font("Helvetica", "I", 9)
    pdf.set_text_color(107, 114, 128)
    pdf.cell(0, 6, "* Anual = Setup + (Mensualidad x 12 meses)")
    pdf.ln(5)
    pdf.cell(0, 6, "* A partir de 3 sedes, el costo por sede baja a $40.00/mes.")
    pdf.ln(5)
    pdf.set_font("Helvetica", "B", 9)
    pdf.set_text_color(59, 130, 246)
    pdf.cell(0, 6, "* \u00bfM\u00e1s de 5 sedes? \u00a1Cont\u00e1ctenos para un plan especial!")
    pdf.ln(8)

    # ---- Que incluye ----
    pdf.section_title("4. \u00bfQu\u00e9 Incluye la Mensualidad?")
    pdf.bullet("Hosting y base de datos en la nube (disponibilidad 24/7).")
    pdf.bullet("Inteligencia artificial para normalizaci\u00f3n y an\u00e1lisis.")
    pdf.bullet("Soporte t\u00e9cnico (horario laboral).")
    pdf.bullet("Backups autom\u00e1ticos de la base de datos.")
    pdf.bullet("Actualizaciones de seguridad y mantenimiento.")
    pdf.bullet("Usuarios ilimitados por sede.")
    pdf.ln(4)

    # ---- Setup ----
    pdf.section_title("5. \u00bfQu\u00e9 Incluye el Setup?")
    pdf.bullet("Configuraci\u00f3n inicial del sistema en la nube.")
    pdf.bullet("Creaci\u00f3n de sedes, usuarios y roles.")
    pdf.bullet("Capacitaci\u00f3n inicial para administradores y vendedores.")
    pdf.bullet("Personalizaci\u00f3n b\u00e1sica (logo, nombre de la empresa).")
    pdf.bullet("Migraci\u00f3n de datos existentes (si aplica).")
    pdf.ln(4)

    # ---- Servicios adicionales ----
    pdf.section_title("6. Servicios Adicionales (cotizaci\u00f3n aparte)")
    pdf.bullet("Desarrollo de nuevas funcionalidades a medida.")
    pdf.bullet("Integraciones con sistemas externos (contabilidad, inventario).")
    pdf.bullet("Capacitaci\u00f3n adicional para nuevos empleados.")
    pdf.bullet("Reportes personalizados y exportaci\u00f3n avanzada.")
    pdf.ln(4)

    # ---- Beneficios ----
    pdf.section_title("7. Beneficios Clave")
    pdf.bullet("Ahorro de tiempo: ", "registro en segundos, sin formularios complicados.")
    pdf.bullet("Mejor toma de decisiones: ", "datos reales de demanda para compras inteligentes.")
    pdf.bullet("Control centralizado: ", "visi\u00f3n completa de todas las sedes desde un solo lugar.")
    pdf.bullet("Sin instalaci\u00f3n: ", "funciona desde cualquier navegador, celular o computadora.")
    pdf.bullet("Escalable: ", "agregue sedes cuando lo necesite, sin costos ocultos.")
    pdf.ln(8)

    # ---- Contacto ----
    pdf.ln(4)
    pdf.set_draw_color(59, 130, 246)
    pdf.set_line_width(0.5)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(10)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(59, 130, 246)
    pdf.cell(0, 8, "Contacto", align="C")
    pdf.ln(10)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(55, 65, 81)
    pdf.cell(0, 6, "Estamos listos para implementar AutoPartes en su negocio.", align="C")
    pdf.ln(6)
    pdf.cell(0, 6, "Cont\u00e1ctenos para agendar una demostraci\u00f3n sin compromiso.", align="C")
    pdf.ln(10)

    # Guardar
    output_path = "/home/user/proyectorepuestos/Propuesta_AutoPartes.pdf"
    pdf.output(output_path)
    print(f"PDF generado: {output_path}")

if __name__ == "__main__":
    generar()
