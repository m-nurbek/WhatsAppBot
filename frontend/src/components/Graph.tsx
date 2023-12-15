import ReactFlow from 'reactflow';

import 'reactflow/dist/style.css';

const x_pos: number = 400;
const y_pos: number = 50;

const nodes = [
    { id: '1', data: { label: 'Начало: Пользователь пишет любое сообщение' }, position: { x: x_pos, y: y_pos } },
    { id: '2', data: { label: 'Бот отвечает: Напишите "/консультация" чтобы начать ...' }, position: { x: x_pos, y: y_pos + 100 } },
    { id: '3', data: { label: 'Пользователь пишет: /консультация' }, position: { x: x_pos, y: y_pos + 200 } },
    { id: '4', data: { label: 'Бот отвечает: Здравствуйте. Ваша заявка на консультацию принята...' }, position: { x: x_pos, y: y_pos + 300 } },
    { id: '5', data: { label: 'Пользователь пишет: /позвонитемне или /напишитемне' }, position: { x: x_pos, y: y_pos + 400 } },
    { id: '6', data: { label: 'Бот отвечает: Ок. Первый освободившийся менеджер сразу же с вами свяжется' }, position: { x: x_pos, y: y_pos + 500 } },

    { id: '7', data: { label: 'Бот отправляет сообщение на указанный номер: (Имя) (Номер Телефона) оставил(а) заявку на получение консультации {НАПИШИТЕ/ПОЗВОНИТЕ}'}, position: { x: x_pos + 200, y: y_pos + 500 } },
    { id: '8', data: { label: 'Бот отправляет информацию в базу данных'}, position: { x: x_pos - 200, y: y_pos + 500} },
];

const initialEdges = [
    { id: 'e1-2', source: '1', target: '2', animated: true },
    { id: 'e2-3', source: '2', target: '3', animated: true },
    { id: 'e3-4', source: '3', target: '4', animated: true },
    { id: 'e4-5', source: '4', target: '5', animated: true },
    { id: 'e5-6', source: '5', target: '6', animated: true },

    { id: 'e5-7', source: '5', target: '7', animated: true },
    { id: 'e5-8', source: '5', target: '8', animated: true },
];

function Graph() {
    return (
        <>
            <div style={{ width: '100vw', height: '100vh' }}>
                <ReactFlow nodes={nodes} edges={initialEdges} />
            </div>
        </>
    );
}

export default Graph;
