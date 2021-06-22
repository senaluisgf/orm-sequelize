const database = require('../models')
const Sequelize = require('sequelize')
const { PessoasService } = require('../services')
const pessoasService = new PessoasService()

class PessoaController {

    static async criarPessoa(req, res){
        const novaPessoa = req.body
        try{
            const novaPessoaCriada = await pessoasService.criaUmRegistro(novaPessoa)
            return res.status(201).json(novaPessoaCriada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarTodasPessoas(req, res){
        try{
            const pessoasAtivas = await pessoasService.pegaTodosRegistros();
            return res
                .status(200)
                .json(pessoasAtivas);
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarPessoasInativas(req, res){
        try{
            const pessoasInativas = await pessoasService.pegaPessoasInativas()
            return res
                .status(200)
                .json(pessoasInativas)
        } catch(err){
            return res.status(500).JSON(err.message)
        }
    }

    static async pegarPessoasAtivas(req, res){
        try{
            const todasAsPessoas = await pessoasService.pegaPessoasAtivas();
            return res
                .status(200)
                .json(todasAsPessoas);
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarUmaPessoa(req, res){
        const { pessoaId } = req.params

        try{
            const umaPessoa = await pessoasService.pegaUmRegistro(pessoaId)
            return res.status(200).json(umaPessoa)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async alterarUmaPessoa(req, res){
        const { pessoaId } = req.params;
        const alteracoes = req.body
        try{
            const pessoaAlterada = await pessoasService.alteraUmRegistro(pessoaId, alteracoes)
            return res.status(200).json(pessoaAlterada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async deletarUmaPessoa(req, res){
        const { pessoaId } = req.params
        try{
            await pessoasService.deletaUmRegistro(pessoaId)
            return res.status(204).json()
        } catch( error){
            return res.status(500).json(error.message)
        }
    }

    static async restaurarUmaPessoa(req, res){
        const { pessoaId } = req.params
        try{
            await pessoasService.restauraPessoa(pessoaId)
            return res
                .status(200)
                .json({message: `pessoa com id ${pessoaId} foi restaurada`})
        } catch(err){
            return res.status(500).json(error.message)
        }
    }

    // MATRICULAS METHODS

    static async criarUmaMatricula(req, res){
        const { pessoaId } = req.params
        const novaMatricula = { ...req.body, estudante_id: Number(pessoaId) }
        try{
            const novaMatriculaCriada = await database.Matriculas.create(novaMatricula)
            return res.status(201).json(novaMatriculaCriada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarMatriculas(req, res){
        const { pessoaId } = req.params
        try{
            const matriculas = await database.Matriculas.findAll({
                where: {
                    estudante_id: Number(pessoaId)
                }
            })
            return res.status(200).json(matriculas)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarUmaMatricula(req, res){
        const { pessoaId, matriculaId } = req.params
        try{
            const matricula = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(pessoaId)
                }
            })
            return res.status(200).json(matricula)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async alterarUmaMatricula(req, res){
        const { pessoaId, matriculaId } = req.params
        const novaMatricula = req.body
        try{
            await database.Matriculas.update(
                novaMatricula,
                { where : {
                    id: Number(matriculaId),
                    estudante_id: Number(pessoaId)
                }}
            )
            const matriculaAlterada = await database.Matriculas.findOne({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(pessoaId)
                }
            })
            return res.status(200).json(matriculaAlterada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async deletarUmaMatricula(req, res){
        const { pessoaId, matriculaId } = req.params
        try{
            await database.Matriculas.destroy({
                where: {
                    id: Number(matriculaId),
                    estudante_id: Number(pessoaId)
                }
            })
            return res.status(204).json()
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async restaurarUmaMatricula(req, res){
        const { pessoaId, matriculaId } = req.params
        try{
            await database.Matriculas.restore({
                where: {
                    estudante_id: Number(pessoaId),
                    id: Number(matriculaId)
                }
            })
            return res
                .status(200)
                .json({message: `matricula ${matriculaId} foi restaurada`})
        } catch(err){
            return res
                .status(500)
                .json(err.message)
        }
    }

    static async pegarMatriculasConfirmadas(req, res){ //modo que nao checa se o usuario existe no sistema
        const { pessoaId } = req.params
        try{
            const matriculas = await database.Matriculas.findAll({
                where: {
                    estudante_id: Number(pessoaId),
                    status: 'Confirmado'
                }
            })

            return res
                .status(200)
                .json(matriculas)
        } catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async pegarMatriculasCanceladas(req, res){ //melhor jeito de fazer correlação pois há uma checagem de usuario
        const { pessoaId } = req.params
        try{
            const pessoa = await database.Pessoas.findOne({ where: {id: Number(pessoaId) } })
            if(pessoa){
                const matriculas = await pessoa.getMatriculasCanceladas()
                return res
                    .status(200)
                    .json(matriculas)
            } else {
                return res.status(404).json({error: 'usuário não cadastrado'})
            }
        } catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async pegarMatriculasPorTurma(req, res){
        const { turmaId } = req.params
        try{
            const {count, rows} = await database.Matriculas.findAndCountAll({
                where: {
                    turma_id: Number(turmaId),
                    status: 'Confirmado'
                },
                limite: 20,
                order: [['estudante_id', 'ASC']]
            })
            return res
                .status(200)
                .json({count,rows})
        } catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async pegarMatriculasLotadas(req, res){
        const lotacao = 2
        try{
            const {count, rows} = await database.Matriculas.findAndCountAll({
                where: {status: "Confirmado"},
                attributes: ['turma_id'],
                group: ['turma_id'],
                having: Sequelize.literal(`count(turma_id) >= ${lotacao}`)
            })

            return res
                .status(200)
                .json({count, rows})
        } catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async cancelarPessoa(req, res){
        const { pessoaId } = req.params
        try{
            await database.sequelize.transaction(async cancelaPessoa => {
                await database.Pessoas.update(
                    { ativo: true },
                    { 
                        where: { id: Number(pessoaId) }
                    },
                    { transaction: cancelaPessoa }
                )
                await database.Matriculas.update(
                    { status: 'Cancelado' },
                    {
                        where: { estudante_id: Number(pessoaId) }
                    },
                    { transaction: cancelaPessoa }
                )
                return res.status(200).json({message: `matriculas do estudante ${pessoaId} foram canceladas`})
            })
        } catch(err){
            return res.status(500).json(err.message)
        }
    }
}

module.exports = PessoaController