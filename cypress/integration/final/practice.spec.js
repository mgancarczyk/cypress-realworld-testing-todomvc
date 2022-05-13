describe('React TodoMVC practice', () => {
  const TODO_ITEM_ONE = 'By Milk'
  const TODO_ITEM_TWO = 'Pay Rent'
  const TODO_ITEM_THREE = 'Pickup Dry Cleaning'
  const TODO_ITEM_FOUR = 'Pay Tax'
  const TODO_ITEM_FIVE = 'Pickup Mat From School'

  beforeEach(() => {
    cy.visit('http://127.0.0.1:8888')
  })

  it('adds five todos', () => {
    // Without using the cy.createDefaultTodos() custom command
    // write a test that asserts you can add 5 todos
    // Hint: make sure to assert the length is equal to 5

    cy.get(".new-todo")
    .type(`${TODO_ITEM_ONE}{enter}`)
    .type(`${TODO_ITEM_TWO}{enter}`)
    .type(`${TODO_ITEM_THREE}{enter}`)
    .type(`${TODO_ITEM_FOUR}{enter}`)
    .type(`${TODO_ITEM_FIVE}{enter}`)

    cy.get(".todo-list li").should("have.length", 5)
    /*
    cy.get('.new-todo')
    .type('Buy Milk{enter}')
    .type('Pay Rent{enter}')
    .type('Walk Dog{enter}')
    .type('Get Gas{enter}')
    .type('Buy Flowers for Anniversary{enter}')
    
    cy.get('.todo-list li').should('have.length', 5)
    */
  })

  it('focuses on the todo input field, when theh app is first opened', () => {
    // Write a test that asserts that the input field
    // is focused automatically when the app is first loaded.
    // Hint: you will need to use cy.focused()
    // https://docs.cypress.io/api/commands/focused

    cy.focused().should("have.class", "new-todo")

    //cy.focused().should('have.class', 'new-todo')
  })

  it('should clear text input field when an item is added', () => {
    // Write a test that ensures that the input field is cleared
    // after adding a todo

    cy.get(".new-todo").type(`${TODO_ITEM_ONE}{enter}`)
    cy.get(".new-todo").should("have.text", "")




    //cy.get('.new-todo')
    //.type('Buy Milk{enter}')

    //cy.get('.new-todo').should('have.text', '')
  })

  it('can mark a todo as "completed"', () => {
    // Write a test that ensures that a todo can be "completed"
    // Hint: You will need to verify the class name of the completed todo

    cy.get(".new-todo").type(`${TODO_ITEM_ONE}{enter}`)

    cy.get(".todo-list li").eq(0).find(".toggle").check()

    cy.get(".todo-list li").eq(0).should("have.class", "completed")

    /*
    cy.get('.new-todo')
    .type('Buy Milk{enter}')

    cy.get('.todo-list li')
    .eq(0)
    .find('.toggle').check()

    cy.get('.todo-list li')
    .eq(0)
    .should('have.class', 'completed')
    */
  })

  it('the "Clear completed" button clears all completed todos', () => {
    // Write a test that ensures that the "Clear completed" removes
    // all completed todos from the app

    cy.get(".new-todo").type(`${TODO_ITEM_ONE}{enter}`)

    cy.get(".todo-list li").eq(0).find(".toggle").check()

    cy.get(".footer").find(".clear-completed").click()

    cy.get(".todo-list li").should("have.length", 0)


    /*
    cy.get('.new-todo')
    .type('Buy Milk{enter}')

    cy.get('.todo-list li')
    .eq(0)
    .find('.toggle').check()

    cy.get('.clear-completed').click()

    cy.get('.todo-list li').should('have.length', 0)
    */
  })

  it('allows you to edit a todo', () => {
    // Write a test that ensures that you can edit a todo
    // Hint: You will need to use cy.dblclick()
    // https://docs.cypress.io/api/commands/dblclick

    cy.get(".new-todo").type(`${TODO_ITEM_ONE}{enter}`)

    cy.get(".todo-list li").eq(0).dblclick().type("Beer{enter}")

    //cy.get(".todo-list li").eq(0).dblclick().clear().type("Beer{enter}")

    cy.get('.todo-list li').eq(0).contains('Beer')

    //cy.get(".todo-list li").eq(0).dblclick()

    //cy.get("".todo-list li").eq(0).find(".edit").clear().type("Beer").type("{enter}")


    /*
    cy.get('.new-todo')
    .type('Buy Milk{enter}')

    cy.get('.todo-list li')
    .eq(0)
    .find('label')
    .dblclick()

    cy.get('.todo-list li')
    .eq(0)
    .find('.edit')
    .clear()
    .type('Pay Rent')
    .type('{enter}')

    cy.get('.todo-list li')
    .eq(0)
    .contains('Pay Rent')
    */
  })

  it('should save edits on blur', () => {
    // Write a test that ensures that an edited todo is saved when it is blurred
    // Hint: You will need to use cy.blur()
    // https://docs.cypress.io/api/commands/blur

    cy.get(".new-todo").type(`${TODO_ITEM_ONE}{enter}`)

    cy.get(".todo-list li").eq(0).dblclick()

    cy.get(".todo-list li").eq(0).find(".edit").clear().type("blur element").blur()

    cy.get(".todo-list li").eq(0).contains("blur element")


    /*
    cy.get('.new-todo')
    .type('Buy Milk{enter}')

    cy.get('.todo-list li')
    .eq(0)
    .find('label')
    .dblclick()

    cy.get('.todo-list li')
    .eq(0)
    .find('.edit')
    .clear()
    .type('Pay Rent')
    .blur()

    cy.get('.todo-list li')
    .eq(0)
    .contains('Pay Rent')
    */
  })

  it('should display the current number of todo items', () => {
    // Write a test that ensures that the app counts the correct number of todos
    // left to be completed, i.e "3 items left" in the bottom left corner.

    cy.get(".new-todo").type(`${TODO_ITEM_ONE}{enter}`)
    cy.get(".new-todo").type(`${TODO_ITEM_TWO}{enter}`)
    cy.get(".new-todo").type(`${TODO_ITEM_THREE}{enter}`)

    cy.get(".todo-count").should("have.text", "3 items left")
    cy.get(".todo-count").contains("3 items left")


    /*
    cy.get('.new-todo')
    .type('Buy Milk{enter}')
    .type('Pay Rent{enter}')

    cy.get('.todo-count').contains('2 items left')
    */
  })

  it('should persist its data after a page refresh', () => {
    // Write a test that ensures that the todos are persisted in the app
    // after the browser refreshes the page
    // Hint: You will need to use cy.reload()
    // https://docs.cypress.io/api/commands/reload

    cy.get(".new-todo")
    .type(`${TODO_ITEM_ONE}{enter}`)
    .type(`${TODO_ITEM_TWO}{enter}`)
    .type(`${TODO_ITEM_THREE}{enter}`)

    cy.reload()

    cy.get(".todo-list li").eq(0).contains(`${TODO_ITEM_ONE}`)
    cy.get(".todo-list li").eq(1).contains(`${TODO_ITEM_TWO}`)
    cy.get(".todo-list li").eq(2).contains(`${TODO_ITEM_THREE}`)

    /*
    cy.get('.new-todo')
    .type('Buy Milk{enter}')
    .type('Pay Rent{enter}')

    cy.reload()

    cy.get('.todo-list li').should('have.length', 2)
    */
  })

  it('can display only completed todos', () => {
    // Write a test that ensures that only the completed todos are
    // displayed when the "Completed" button is clicked at the bottom

    cy.get(".new-todo")
    .type(`${TODO_ITEM_ONE}{enter}`)
    .type(`${TODO_ITEM_TWO}{enter}`)
    .type(`${TODO_ITEM_THREE}{enter}`)

    cy.get(".todo-list li").eq(1).find(".toggle").check()

    cy.get(".filters").contains("Completed").click()

    cy.get(".todo-list li").eq(0).should("have.text", `${TODO_ITEM_TWO}`)


    /*
    cy.get('.new-todo')
    .type('Buy Milk{enter}')

    cy.get('.todo-list li')
    .eq(0)
    .find('.toggle')
    .check()

    cy.get('.filters')
    .contains('Completed')
    .click()

    cy.get('.todo-list li').should('have.length', 1)
    */
  })
})
