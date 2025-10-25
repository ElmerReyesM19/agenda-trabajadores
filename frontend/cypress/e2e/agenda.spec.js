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

     // 🔄 Esperar a que se cargue la vista "ver"
    cy.wait(1000);


    // Clic en el día 25
    cy.get('button.rbc-button-link').contains(/^25$/).click({ force: true });

    // Esperar carga de actividades
    cy.contains(/^Actividades del/, { timeout: 10000 }).should('exist');

    // Verificar que aparecen los datos
    cy.contains('Reunión de equipo', { timeout: 10000 }).should('exist');
    cy.contains('EmpE2E', { timeout: 10000 }).should('exist');
  });
});
