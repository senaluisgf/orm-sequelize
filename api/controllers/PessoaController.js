const database = require('../models')

class PessoaController {

    static async criarPessoa(req, res){
        const novaPessoa = req.body
        try{
            const novaPessoaCriada = await database.Pessoas.create(novaPessoa)
            return res.status(201).json(novaPessoaCriada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarPessoasAtivas(req, res){
        try{
            const pessoasAtivas = await database.Pessoas.findAll();
            return res
                .status(200)
                .json(pessoasAtivas);
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarPessoasInativas(req, res){
        try{
            const pessoasInativas = await database.Pessoas.scope('inativos').findAll()
            return res
                .status(200)
                .json(pessoasInativas)
        } catch(err){
            return res.status(500).JSON(err.message)
        }
    }

    static async pegarTodasAsPessoas(req, res){
        try{
            const todasAsPessoas = await database.Pessoas.scope('todos').findAll();
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
            const umaPessoa = await database.Pessoas.findOne({
                where: {
                    id: Number(pessoaId)
                }
            })
            return res.status(200).json(umaPessoa)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async alterarUmaPessoa(req, res){
        const { pessoaId } = req.params;
        const alteracoes = req.body
        try{
            await database.Pessoas.update(
                alteracoes,
                {
                    where: {
                        id: Number(pessoaId)
                    }
                }
            )
            const pessoaAlterada = await database.Pessoas.findOne({
                where: {
                    id: Number(pessoaId)
                }
            })
            return res.status(200).json(pessoaAlterada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async deletarUmaPessoa(req, res){
        const { pessoaId } = req.params
        try{
            await database.Pessoas.destroy({
                where: {
                    id: Number(pessoaId)
                }
            })
            return res.status(204).json()
        } catch( error){
            return res.status(500).json(error.message)
        }
    }

    static async restaurarUmaPessoa(req, res){
        const { pessoaId } = req.params
        try{
            await database.Pessoas.restore({
                where: {
                    id: Number(pessoaId)
                }
            })
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
}

module.exports = PessoaController