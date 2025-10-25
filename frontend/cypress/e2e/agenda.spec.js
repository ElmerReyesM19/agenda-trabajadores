describe('Flujo completo agenda de trabajadores', () => {
  it('Crear empleado, crear actividad, ver en calendario', () => {
    cy.visit('http://localhost:5173');

    // Ir al formulario de actividad
    cy.contains('Crear actividad').click();

    // Llenar datos de la actividad
    cy.get('input[type="date"]').type('2025-10-25');
    cy.get('input[type="text"]').eq(0).type('Reunión de equipo'); // descripción
    cy.get('input[type="text"]').eq(1).type('Sala 101');          // lugar

    // Agregar nuevo empleado
    cy.get('input[placeholder="Nombre del empleado"]').type('EmpE2E');
    cy.contains('+ Añadir empleado').click();

    // Enviar formulario
    cy.contains('Crear Actividad').click();

    // Esperar que se cree la actividad y se actualice la vista
    cy.wait(1000); // ajusta si es necesario

    // Ir a vista "Ver actividad" si es necesario
    cy.contains('Ver actividad').click({ force: true });

    // Hacer clic en el día 25 para cargar las actividades
    cy.get('.rbc-calendar').contains('25').click({ force: true });

    // ✅ Verificar que la actividad se muestra correctamente en la tabla
    cy.contains('Reunión de equipo', { timeout: 10000 }).should('exist');
    cy.contains('EmpE2E', { timeout: 10000 }).should('exist');
  });
});