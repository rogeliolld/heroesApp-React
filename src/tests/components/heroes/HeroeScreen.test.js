import React from 'react'
import { mount } from "enzyme"
import { HeroeScreen } from '../../../components/heroes/HeroeScreen';
import { MemoryRouter, Route } from 'react-router';

describe('Pruebas en <HeroeScreen/>', () => {
    const history = {
        length: 10,
        push: jest.fn(),
        goBack: jest.fn(),
    }
    
    test('debe mostrar el componente redirect si no hay argumentos en el URL', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroeScreen history={ history }/>
            </MemoryRouter>
        );

        expect(wrapper.find('Redirect').exists()).toBe(true);
    });

    test('debe de mostrar un hero si el parametro existe y se encuentra', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route path="/hero/:heroeId" component={ HeroeScreen }/>
            </MemoryRouter>
        );
    
        expect(wrapper.find('.row').exists()).toBe(true);
        
    });

    test('debe de regresar a la pantalla anterior con PUSH', () => {

        const history = {
            length: 1,
            push: jest.fn(),
            goBack: jest.fn(),
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ ()=> <HeroeScreen history={ history }/> }
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();
    });

    test('debe de regresar a la pantalla anterior GOBACK', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ ()=> <HeroeScreen history={ history }/> }
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect(history.push).toBeCalledTimes(0);
        expect(history.goBack).toHaveBeenCalled();
        
    });
    
    test('debe de llamar el redirect si el hero no existe', () => {

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-spider-123456']}>
                <Route 
                    path="/hero/:heroeId" 
                    component={ ()=> <HeroeScreen history={ history }/> }
                />
            </MemoryRouter>
        );

        expect(wrapper.text()).toBe('');
        
    })
    
    
    
})
