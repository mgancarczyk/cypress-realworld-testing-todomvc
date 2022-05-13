describe("React TodoMVC", () => {
    const TODO_ITEM_ONE = 'By Milk'
    const TODO_ITEM_TWO = 'Pay Rent'
    const TODO_ITEM_THREE = 'Pickup Dry Cleaning'
    
    beforeEach(() => {
        cy.visit("http://localhost:8888")
    })
    it("add a single todo", () => {
        cy.get(".new-todo").type(`${TODO_ITEM_ONE}{enter}`)
        cy.get(".todo-list li").should("have.length", 1)
    })

    it("add three todos", () => {
        cy.createDefaultTodos().as("todos")
        cy.get("@todos").should("have.length", 3)
        //cy.get("@todos").eq(0).find("label").should("contain", TODO_ITEM_ONE)
    })

    it("should append new items to the bottom of the list", () => {
        cy.createDefaultTodos().as("todos")

        //Todo 1
        cy.get("@todos").eq(0).find("label").should("contain", TODO_ITEM_ONE)

        //Todo 2
        cy.get("@todos").eq(1).find("label").should("contain", TODO_ITEM_TWO)

        //Todo 3
        cy.get("@todos").eq(2).find("label").should("contain", TODO_ITEM_THREE)

        cy.get("@todos").should("have.length", 3)

        cy.get(".todo-count").contains("3 items left")
    })

    it.only("dose NOT display the foote or todo-list when there are no todos", () => {
        cy.get(".footer").should("not.exist")
        cy.get(".todo-lsit").should("not.exist")
    })
})