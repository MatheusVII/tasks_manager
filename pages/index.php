<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inicio</title>
    <link rel="stylesheet" href="../css/main.css">
</head>
<body>
    <?php
        include '../includes/_header.php';
    ?>
    <div class="overflow" id="overflow"></div>
    <section class="_index-modal-criar-tarefa" id="newTaskModal">
            <h3>Nova Tarefa</h3>
            <div class="form">
                <div class="inputs">
                    <h4>Titulo</h4>
                    <input type="text" name="title" id="title" placeholder="Titulo da sua tarefa">
                </div>
                <div class="inputs" id="priorityInput">
                    <h4>Prioridade da tarefa</h4>
                    <div class="radiosDiv">
                        <div class="radio">
                            <input type="radio" name="priority" id="low" value="low" checked>
                            <label for="low" id="lowLabel">Baixa</label>
                        </div>
                        <div class="radio">
                            <input type="radio" name="priority" id="medium" value="medium">
                            <label for="low" id="mediumLabel">Media</label>
                        </div>
                        <div class="radio">
                            <input type="radio" name="priority" id="high" value="high">
                            <label for="low" id="highLabel">Alta</label>
                        </div>
                        <div class="radio">
                            <input type="radio" name="priority" id="urgent" value="urgent">
                            <label for="low" id="urgentLabel">Urgente</label>
                        </div>
                    </div>
                </div>
                <div class="inputs">
                    <h4>Data de validade</h4>
                    <input type="date" name="dueDate" id="dueDate">
                </div>
                <div class="inputs">
                    <h4>Descricao</h4>
                    <textarea name="description" id="description" placeholder="Descricao da sua tarefa"></textarea>
                </div>
                <div class="buttons">
                    <button id="closeNewTaskButton">Cancelar</button>
                    <button id="createNewTaskButton">Criar</button>
                </div>
            </div>
    </section>
    <main>
        <section class="_index-tarefas-pendentes">
            <div class="header">
                <h2>Tarefas Pendentes</h2>
                <button id="newTaskButton">Nova Tarefa</button>
            </div>

            <ul class="lista-tarefas-pendentes">
                <li>
                    <div class="prioridade">
                        <p>Urgente</p>
                        <button><img src="../assets/icons/concluida.png" alt=""></button>
                    </div>
                    <div class="titulo">
                        <h3>Levar minha vo no Jiu Jitsu</h3>
                    </div>
                    <div class="descricao">
                        <p>asojadosjdoahjsodjiasdoijajsdioajs odijojsodwejhkrjwgbdbsmnbxmcvjxhg</p>
                    </div>
                    <div class="footer">
                        <div class="date">
                            <div class="criado">
                                <h3>Criado Em</h3>
                                <h3>12/03/2026</h3>
                            </div>
                            <div class="expirado">
                                <h3>Expira Em</h3>
                                <h3>12/04/2026</h3>
                            </div>
                        </div>
                        <button><img src="../assets/icons/lixeira.png" alt=""></button>
                    </div>
                </li>
            </ul>
        </section>
    </main>
    <?php
        include '../includes/_mobileNav.php';
    ?>
</body>
<script type="module" src="../src/js/main.js"></script>
</html>