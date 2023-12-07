import React, { useEffect, useState } from 'react';
import { chakra, Button, List, ListItem, Heading, Flex, Input, Text } from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

export const Home = () => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
        setTodos(storedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
    }, [todos]);

    const createTodoHandler = () => {
        if (text.trim() !== '') {
            setTodos((prevState) => [
                ...prevState,
                { id: Date.now(), text: text.trim(), completed: false },
            ]);
            setText('');
        }
    };

    const removeTodoHandler = (id) => {
        setTodos((prevState) => prevState.filter((todo) => todo.id !== id));
    };

    const toggleCompleteHandler = (id) => {
        setTodos((prevState) =>
            prevState.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            )
        );
    };

    return (
        <Flex
            flexDirection="column"
            h="100vh"
            w="100vw"
            m="1rem"
            gap="1rem"
            alignItems="center"
        >
            <Heading textTransform="uppercase">Todo List</Heading>
            <List
                h="60vh"
                w="70vw"
                display="flex"
                flexDirection="column"
                overflowY="scroll"
                border="2px solid black"
                borderRadius="md"
                p="10px"
            >
                <AnimatePresence>
                    {todos.map((todo, index) => (
                        <motion.div
                            key={todo.id}
                            initial={{ opacity: 0, y: 1500 }}
                            animate={{ opacity: 2, y: 0 }}
                            exit={{ opacity: 0, y: -1500 }}
                            transition={{ duration: 0.7 }}
                        >
                            <ListItem
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderBottom="1px solid gray"
                                py="8px"
                            >
                                <Text
                                    textDecoration={todo.completed ? 'line-through' : 'none'}
                                    onClick={() => toggleCompleteHandler(todo.id)}
                                    cursor="pointer"
                                >
                                    {todo.text}
                                </Text>
                                <Button
                                    onClick={() => removeTodoHandler(todo.id)}
                                    background="red.500"
                                    color="white"
                                    _hover={{
                                        background: 'red.600',
                                    }}
                                >
                                    Удалить
                                </Button>
                            </ListItem>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </List>
            <chakra.form
                onSubmit={(e) => {
                    e.preventDefault(); // Без перезагрузки приложения после добавления задачи
                    createTodoHandler(text);
                }}
                display="flex"
                flexDirection="column"
                alignItems="center"
                gap="20px"
            >
                <Input
                    placeholder="Напишите задачу..."
                    maxLength={80}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    w="300px"
                    h="32px"
                />
                <Button
                    isDisabled={!text.trim().length}
                    type="submit"
                    w="fit-content"
                    background="blue.500"
                    color="white"
                    _hover={{
                        background: 'blue.600',
                    }}
                >
                    Добавить задачу
                </Button>
            </chakra.form>
        </Flex>
    );
};
