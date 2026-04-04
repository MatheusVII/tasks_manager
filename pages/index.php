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
    <main>
        <section class="_index-tarefas-pendentes">
            <div class="header">
                <h2>Tarefas Pendentes</h2>
                <button>Nova Tarefa</button>
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