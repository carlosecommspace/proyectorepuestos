#!/usr/bin/env python3
"""Genera propuesta comercial en PDF para AutoPartes."""

from fpdf import FPDF
from datetime import date

class PropuestaPDF(FPDF):
    def header(self):
        self.set_font("Helvetica", "B", 22)
        self.set_text_color(31, 41, 55)  # gray-800
        self.cell(0, 12, "AutoPartes", align="L")
        self.ln(8)
        self.set_draw_color(59, 130, 246)  # blue-500
        self.set_line_width(0.8)
        self.line(10, self.get_y(), 200, self.get_y())
        self.ln(6)

    def footer(self):
        self.set_y(-15)
        self.set_font("Helvetica", "I", 8)
        self.set_text_color(156, 163, 175)
        self.cell(0, 10, f"AutoPartes - Propuesta Comercial - Pag {self.page_no()}/{{nb}}", align="C")

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
    pdf.cell(0, 8, "Sistema de Gestion de Solicitudes de Repuestos con IA", align="C")
    pdf.ln(6)
    pdf.cell(0, 8, f"Fecha: {hoy}", align="C")
    pdf.ln(12)

    # ---- Que es AutoPartes ----
    pdf.section_title("1. Que es AutoPartes?")
    pdf.body_text(
        "AutoPartes es un sistema web inteligente disenado para la gestion de "
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
    pdf.bullet("Entrada en lenguaje natural: ", "los vendedores describen el repuesto como lo harian verbalmente.")
    pdf.bullet("Normalizacion automatica con IA: ", "extrae marca, modelo, ano, pieza y categoria.")
    pdf.bullet("Glosario venezolano integrado: ", "reconoce terminos locales (caucho, pila, banditas, etc.).")
    pdf.ln(2)

    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(31, 41, 55)
    pdf.cell(0, 7, "Gestion Multi-Sede")
    pdf.ln(7)
    pdf.bullet("Cada sede opera de forma independiente con sus propios vendedores.")
    pdf.bullet("El administrador tiene vision global de todas las sedes.")
    pdf.bullet("Segregacion de datos: ", "cada vendedor solo ve la informacion de su sede.")
    pdf.ln(2)

    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(31, 41, 55)
    pdf.cell(0, 7, "Panel de Analitica")
    pdf.ln(7)
    pdf.bullet("Graficos de demanda por categoria, marca, sede y tendencia mensual.")
    pdf.bullet("Top de repuestos mas solicitados.")
    pdf.bullet("Patrones de demanda por ubicacion.")
    pdf.ln(2)

    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(31, 41, 55)
    pdf.cell(0, 7, "Chat con Inteligencia Artificial")
    pdf.ln(7)
    pdf.bullet("Asistente IA para consultar tendencias y recomendaciones de compra.")
    pdf.bullet("Preguntas como: ", "\"Que repuestos deberia comprar para la Sede Principal?\"")
    pdf.ln(2)

    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(31, 41, 55)
    pdf.cell(0, 7, "Seguridad y Control de Acceso")
    pdf.ln(7)
    pdf.bullet("Roles diferenciados: ", "Administrador y Vendedor.")
    pdf.bullet("Autenticacion segura con contrasenas encriptadas.")
    pdf.bullet("Sesiones protegidas con JWT.")
    pdf.ln(4)

    # ---- Inversion ----
    pdf.section_title("3. Inversion")

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
        ("Setup inicial (unico pago)", "$150.00"),
        ("Mensualidad por sede", "$50.00 / mes"),
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
    pdf.cell(0, 7, "Ejemplos de inversion:")
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
        ("3 sedes", "$150", "$150", "$1,950"),
        ("5 sedes", "$150", "$250", "$3,150"),
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
    pdf.ln(8)

    # ---- Que incluye ----
    pdf.section_title("4. Que Incluye la Mensualidad?")
    pdf.bullet("Hosting y base de datos en la nube (disponibilidad 24/7).")
    pdf.bullet("Inteligencia artificial para normalizacion y analisis.")
    pdf.bullet("Soporte tecnico (horario laboral).")
    pdf.bullet("Backups automaticos de la base de datos.")
    pdf.bullet("Actualizaciones de seguridad y mantenimiento.")
    pdf.bullet("Usuarios ilimitados por sede.")
    pdf.ln(4)

    # ---- Setup ----
    pdf.section_title("5. Que Incluye el Setup?")
    pdf.bullet("Configuracion inicial del sistema en la nube.")
    pdf.bullet("Creacion de sedes, usuarios y roles.")
    pdf.bullet("Capacitacion inicial para administradores y vendedores.")
    pdf.bullet("Personalizacion basica (logo, nombre de la empresa).")
    pdf.bullet("Migracion de datos existentes (si aplica).")
    pdf.ln(4)

    # ---- Servicios adicionales ----
    pdf.section_title("6. Servicios Adicionales (cotizacion aparte)")
    pdf.bullet("Desarrollo de nuevas funcionalidades a medida.")
    pdf.bullet("Integraciones con sistemas externos (contabilidad, inventario).")
    pdf.bullet("Capacitacion adicional para nuevos empleados.")
    pdf.bullet("Reportes personalizados y exportacion avanzada.")
    pdf.ln(4)

    # ---- Beneficios ----
    pdf.section_title("7. Beneficios Clave")
    pdf.bullet("Ahorro de tiempo: ", "registro en segundos, sin formularios complicados.")
    pdf.bullet("Mejor toma de decisiones: ", "datos reales de demanda para compras inteligentes.")
    pdf.bullet("Control centralizado: ", "vision completa de todas las sedes desde un solo lugar.")
    pdf.bullet("Sin instalacion: ", "funciona desde cualquier navegador, celular o computadora.")
    pdf.bullet("Escalable: ", "agregue sedes cuando lo necesite, sin costos ocultos.")
    pdf.ln(8)

    # ---- Contacto ----
    pdf.set_draw_color(59, 130, 246)
    pdf.set_line_width(0.5)
    pdf.line(10, pdf.get_y(), 200, pdf.get_y())
    pdf.ln(6)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(59, 130, 246)
    pdf.cell(0, 8, "Contacto", align="C")
    pdf.ln(10)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(55, 65, 81)
    pdf.cell(0, 6, "Estamos listos para implementar AutoPartes en su negocio.", align="C")
    pdf.ln(6)
    pdf.cell(0, 6, "Contactenos para agendar una demostracion sin compromiso.", align="C")
    pdf.ln(10)

    # Guardar
    output_path = "/home/user/proyectorepuestos/Propuesta_AutoPartes.pdf"
    pdf.output(output_path)
    print(f"PDF generado: {output_path}")

if __name__ == "__main__":
    generar()
