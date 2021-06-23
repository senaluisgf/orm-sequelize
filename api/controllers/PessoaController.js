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
            const novaMatriculaCriada = await pessoasService.matriculas.criaUmRegistro(novaMatricula)
            return res.status(201).json(novaMatriculaCriada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarMatriculas(req, res){
        const { pessoaId } = req.params
        try{
            const matriculas = await pessoasService.pegaMatriculas({estudante_id: Number(pessoaId)})
            return res.status(200).json(matriculas)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async pegarUmaMatricula(req, res){
        const { pessoaId, matriculaId } = req.params
        try{
            const matricula = await pessoasService.pegaUmaMatricula({id: Number(matriculaId), estudante_id: Number(pessoaId)})
            return res.status(200).json(matricula)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async alterarUmaMatricula(req, res){
        const { pessoaId, matriculaId } = req.params
        const novaMatricula = req.body
        try{
            const matriculaAlterada = await pessoasService.alteraUmaMatricula(novaMatricula, {id: Number(matriculaId), estudante_id: Number(pessoaId)})
            return res.status(200).json(matriculaAlterada)
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async deletarUmaMatricula(req, res){
        const { pessoaId, matriculaId } = req.params
        try{
            await pessoasService.deletaUmaMatricula({id: Number(matriculaId), estudante_id: Number(pessoaId)})
            return res.status(204).json()
        } catch(error){
            return res.status(500).json(error.message)
        }
    }

    static async restaurarUmaMatricula(req, res){
        const { pessoaId, matriculaId } = req.params
        try{
            await pessoasService.restauraMatricula({estudante_id: Number(pessoaId), id: Number(matriculaId)})
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
            const matriculas = await pessoasService.pegaMatriculas({estudante_id: Number(pessoaId), status: 'Confirmado'})
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
            const matriculas = await pessoasService.pegaMatriculasCanceladas(pessoaId)
            return res
                .status(200)
                .json(matriculas)
        } catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async pegarMatriculasPorTurma(req, res){
        const { turmaId } = req.params
        try{
            const result = await pessoasService.pegaMatriculasPorTurma(turmaId)
            return res
                .status(200)
                .json(result)
        } catch(err){
            return res.status(500).json(err.message)
        }
    }

    static async pegarMatriculasLotadas(req, res){
        const lotacao = 1
        try{
            const {count, rows} = await pessoasService.pegaTurmasLotadas(lotacao)

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
            await pessoasService.cancelaPessoaEMatriculas(pessoaId)
            return res.status(200).json({message: `matriculas do estudante ${pessoaId} foram canceladas`})
        } catch(err){
            return res.status(500).json(err.message)
        }
    }
}

module.exports = PessoaController