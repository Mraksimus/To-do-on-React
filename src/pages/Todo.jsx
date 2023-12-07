import React, {useEffect, useRef, useState} from 'react';
import { chakra, Button, List, ListItem, Heading, Flex, Input, Text } from '@chakra-ui/react';
import {motion, AnimatePresence, useTransform, useViewportScroll} from 'framer-motion';
import { animate } from "framer-motion/dom"
import '../styles/Todo.css';

export const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [text, setText] = useState('');
    const listRef = useRef(null);

    const scrollToBottom = () => {
        const targetScroll = listRef.current.scrollHeight - listRef.current.clientHeight;
        motion(listRef.current).animate({ scrollTop: targetScroll }, { duration: 0.5 });
    };

    useEffect(() => {
        const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    }, []);

    useEffect(() => {
        localStorage.setItem('todos', JSON.stringify(todos));
        listRef.current.scrollTop = listRef.current.scrollHeight;
    }, [todos]);

    const { scrollYProgress } = useViewportScroll()
    const scale = useTransform(scrollYProgress, [0, 1], [0.2, 2]);

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
            h="96vh"
            w="99vw"
            m="1rem"
            gap="1rem"
            alignItems="center"
        >
            <Heading textTransform="uppercase">Todo List</Heading>
            <chakra.form
                onSubmit={(e) => {
                    e.preventDefault(); // Без перезагрузки приложения после добавления задачи
                    createTodoHandler(text);
                }}
                display="flex"
                flexDirection="row"
                alignItems="center"
                justifyContent="center"
                gap="20px"
                minH="70px"
                h="7vh"
                w="70vw"
                borderRadius="15px"
                boxShadow="0 2px 10px 1px rgba(34, 60, 80, 0.2)"
            >
                <Input
                    placeholder="Напишите задачу..."
                    maxLength={80}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    w="50%"
                    h="70%"
                />
                <Button
                    isDisabled={!text.trim().length}
                    type="submit"
                    w="fit-content"
                    h="70%"
                    background="#82cf82"
                    color="gray.200"
                    _hover={{
                        background: "#4BB34B",
                        color: "white"
                    }}
                >
                    Добавить задачу
                </Button>
            </chakra.form>
            <List
                ref={listRef}
                h="70vh"
                w="70vw"
                display="flex"
                flexDirection="column"
                overflowX="hidden"
                boxShadow="0 20px 20px -25px rgba(34, 60, 80, 0.2) inset, 0 -20px 20px -25px rgba(34, 60, 80, 0.2) inset;"
                borderRadius="15px"
                p="10px"
            >
                <AnimatePresence>
                    {todos.map((todo, index) => (
                        <motion.div
                            key={todo.id}
                            initial={{ opacity: 0, x: -1500 }}
                            animate={{ opacity: 2, x: 0 }}
                            exit={{ opacity: 0, x: 1500 }}
                            transition={{ duration: 0.7 }}
                        >
                            <ListItem
                                display="flex"
                                justifyContent="space-between"
                                alignItems="center"
                                borderRadius="20px"
                                boxShadow="0 2px 10px 1px rgba(34, 60, 80, 0.2)"
                                p="8px 20px"
                                mb="10px"
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
                                    background="blue.500"
                                    color="white"
                                    transition=".36s"
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
        </Flex>
    );
};
