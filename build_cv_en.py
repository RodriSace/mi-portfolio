#!/usr/bin/env python3
"""Genera el CV en inglés (cv-en.pdf) con diseño de dos columnas y la marca del portfolio."""
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor
from reportlab.pdfgen import canvas

ACCENT = HexColor('#6d3bd6')      # morado de marca
ACCENT2 = HexColor('#3b82f6')     # azul
DARK = HexColor('#0f172a')
GRAY = HexColor('#475569')
LIGHT_GRAY = HexColor('#64748b')
SIDEBAR_BG = HexColor('#0f1117')
WHITE = HexColor('#ffffff')
SIDE_TXT = HexColor('#cbd5e1')

W, H = A4
c = canvas.Canvas('cv-en.pdf', pagesize=A4)

# ---- Sidebar ----
SIDE_W = 68 * mm
c.setFillColor(SIDEBAR_BG)
c.rect(0, 0, SIDE_W, H, fill=1, stroke=0)
# Acento superior
c.setFillColor(ACCENT)
c.rect(0, H - 6*mm, SIDE_W, 6*mm, fill=1, stroke=0)

def side_heading(y, text):
    c.setFillColor(ACCENT)
    c.setFont('Helvetica-Bold', 11)
    c.drawString(10*mm, y, text.upper())
    c.setStrokeColor(ACCENT)
    c.setLineWidth(0.8)
    c.line(10*mm, y - 2*mm, SIDE_W - 8*mm, y - 2*mm)
    return y - 8*mm

def side_text(y, lines, size=8.5, leading=4.6*mm, color=SIDE_TXT):
    c.setFillColor(color)
    c.setFont('Helvetica', size)
    for ln in lines:
        c.drawString(10*mm, y, ln)
        y -= leading
    return y

y = H - 18*mm
c.setFillColor(WHITE)
c.setFont('Helvetica-Bold', 16)
c.drawString(10*mm, y, 'Rodrigo')
y -= 6*mm
c.drawString(10*mm, y, 'de la Hoz López')
y -= 12*mm

y = side_heading(y, 'Contact')
y = side_text(y, [
    'Phone:', '+34 643 079 002', '',
    'Email:', 'rodrigohozlopez', '@gmail.com', '',
    'GitHub:', 'github.com/RodriSace', '',
    'Location:', 'Ciudad Real, Spain',
])
y -= 4*mm

y = side_heading(y, 'Languages')
y = side_text(y, [
    'Spanish: Native', 'English: B1 (Intermediate)', '— Erasmus stay in Poland',
])
y -= 4*mm

y = side_heading(y, 'Information')
y = side_text(y, [
    "Driving license (type B)", 'Own vehicle available', 'Willing to travel',
])
y -= 4*mm

y = side_heading(y, 'Skills')
c.setFillColor(WHITE); c.setFont('Helvetica-Bold', 8.5)
c.drawString(10*mm, y, 'Frontend'); y -= 4.4*mm
y = side_text(y, ['React, Angular, HTML5,', 'CSS3, JavaScript'])
c.setFillColor(WHITE); c.setFont('Helvetica-Bold', 8.5)
c.drawString(10*mm, y, 'Backend'); y -= 4.4*mm
y = side_text(y, ['Node.js, Spring Boot,', 'Java, Python, C++'])
c.setFillColor(WHITE); c.setFont('Helvetica-Bold', 8.5)
c.drawString(10*mm, y, 'Databases'); y -= 4.4*mm
y = side_text(y, ['Oracle, PostgreSQL,', 'SQL Server, MySQL'])
c.setFillColor(WHITE); c.setFont('Helvetica-Bold', 8.5)
c.drawString(10*mm, y, 'Tools'); y -= 4.4*mm
y = side_text(y, ['Git, GitHub, Docker,', 'VS Code, Linux'])

# ---- Main column ----
MX = SIDE_W + 10*mm
MW = W - MX - 12*mm

def main_heading(y, text):
    c.setFillColor(ACCENT)
    c.setFont('Helvetica-Bold', 13)
    c.drawString(MX, y, text.upper())
    c.setStrokeColor(HexColor('#e2e8f0'))
    c.setLineWidth(1)
    c.line(MX, y - 2.5*mm, W - 12*mm, y - 2.5*mm)
    return y - 9*mm

def wrap(text, font, size, maxw):
    c.setFont(font, size)
    words = text.split()
    lines, cur = [], ''
    for w in words:
        test = (cur + ' ' + w).strip()
        if c.stringWidth(test, font, size) <= maxw:
            cur = test
        else:
            lines.append(cur); cur = w
    if cur: lines.append(cur)
    return lines

def body(y, text, size=9.5, leading=4.8*mm, color=GRAY, bullet=False):
    lines = wrap(text, 'Helvetica', size, MW - (5*mm if bullet else 0))
    for i, ln in enumerate(lines):
        c.setFillColor(color); c.setFont('Helvetica', size)
        if bullet and i == 0:
            c.setFillColor(ACCENT); c.drawString(MX, y, '•')
            c.setFillColor(color); c.drawString(MX + 4*mm, y, ln)
        elif bullet:
            c.drawString(MX + 4*mm, y, ln)
        else:
            c.drawString(MX, y, ln)
        y -= leading
    return y

y = H - 20*mm
c.setFillColor(DARK)
c.setFont('Helvetica-Bold', 22)
c.drawString(MX, y, 'Rodrigo de la Hoz López')
y -= 8*mm
c.setFillColor(ACCENT2)
c.setFont('Helvetica-Bold', 12)
c.drawString(MX, y, 'Computer Engineer & Software Developer')
y -= 11*mm

y = main_heading(y, 'Professional Profile')
y = body(y, ('Computer Engineer specialised in Information Technology with a full-stack '
             'profile, focused on building end-to-end software solutions. Experienced in '
             'designing interactive user interfaces with React and Angular, implementing '
             'backend services with Node.js and Spring Boot, and a solid background in the '
             'design, administration and optimisation of databases such as Oracle, PostgreSQL '
             'and SQL Server during my time at NTT DATA. Strong learner and team player.'))
y -= 4*mm

y = main_heading(y, 'Work Experience')
c.setFillColor(DARK); c.setFont('Helvetica-Bold', 10.5)
c.drawString(MX, y, 'Software Developer  |  NTT DATA'); y -= 4.6*mm
c.setFillColor(LIGHT_GRAY); c.setFont('Helvetica-Oblique', 9)
c.drawString(MX, y, '2026 - Present  |  Ciudad Real, Spain'); y -= 5.4*mm
y = body(y, 'Frontend and backend development for corporate web systems using agile methodologies.', bullet=True)
y = body(y, 'Integration of backend services and RESTful APIs with relational databases.', bullet=True)
y = body(y, 'Design, query optimisation and administration of enterprise databases.', bullet=True)
y -= 4*mm

y = main_heading(y, 'Education')
c.setFillColor(DARK); c.setFont('Helvetica-Bold', 10.5)
c.drawString(MX, y, "Bachelor's Degree in Computer Engineering"); y -= 4.4*mm
c.setFillColor(GRAY); c.setFont('Helvetica', 9)
c.drawString(MX, y, 'Major in Information Technology'); y -= 4.4*mm
c.setFillColor(LIGHT_GRAY); c.setFont('Helvetica-Oblique', 9)
c.drawString(MX, y, 'University of Castilla-La Mancha  |  2022 - Present (Final Year)'); y -= 6*mm
c.setFillColor(DARK); c.setFont('Helvetica-Bold', 10.5)
c.drawString(MX, y, 'Erasmus Exchange Programme (5 months)'); y -= 4.4*mm
c.setFillColor(LIGHT_GRAY); c.setFont('Helvetica-Oblique', 9)
c.drawString(MX, y, 'University of Kielce, Poland  |  2024'); y -= 5.4*mm
y = body(y, 'Technical and academic software projects in multicultural environments; '
            'strengthened intercultural skills, adaptability and technical English.', bullet=True)
y -= 4*mm

y = main_heading(y, 'Featured Projects')
c.setFillColor(DARK); c.setFont('Helvetica-Bold', 10)
c.drawString(MX, y, 'La Gramola Virtual'); y -= 4.2*mm
c.setFillColor(LIGHT_GRAY); c.setFont('Helvetica-Oblique', 8.5)
c.drawString(MX, y, 'Angular 19, Spring Boot 3, MySQL, Stripe API, Spotify API'); y -= 4.6*mm
y = body(y, 'Interactive web platform for playing music in public venues with dynamic queues.', bullet=True, size=9)
y -= 1.5*mm
c.setFillColor(DARK); c.setFont('Helvetica-Bold', 10)
c.drawString(MX, y, 'Spotify to Vinyl'); y -= 4.2*mm
c.setFillColor(LIGHT_GRAY); c.setFont('Helvetica-Oblique', 8.5)
c.drawString(MX, y, 'React.js, Node.js, Express, Spotify Web API'); y -= 4.6*mm
y = body(y, 'Web app for data visualisation and 3D rendering of vinyl records.', bullet=True, size=9)
y -= 1.5*mm
c.setFillColor(DARK); c.setFont('Helvetica-Bold', 10)
c.drawString(MX, y, 'iPokemon2025'); y -= 4.2*mm
c.setFillColor(LIGHT_GRAY); c.setFont('Helvetica-Oblique', 8.5)
c.drawString(MX, y, 'HTML5, CSS3, Vanilla JavaScript, PokeAPI'); y -= 4.6*mm
y = body(y, 'Web-based battle simulator game focused on usability and responsive UI design.', bullet=True, size=9)

c.showPage()
c.save()
print('cv-en.pdf generado')
