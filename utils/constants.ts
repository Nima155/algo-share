import clike from '../public/clike.svg'
import rust from '../public/rust.svg'
import dart from '../public/dart.svg'
import perl from '../public/perl.svg'
import go from '../public/go.svg'
import haskell from '../public/haskell.svg'
import javascript from '../public/javascript.svg'
import julia from '../public/julia.svg'
import php from '../public/php.svg'
import python from '../public/python.svg'
import ruby from '../public/ruby.svg'
import swift from '../public/swift.svg'
import lua from '../public/lua.svg'
import elm from '../public/elm.svg'
import crystal from '../public/crystal.svg'
import fortran from '../public/fortran.svg'
import commonlisp from '../public/commonlisp.svg'
const SERVER =
	process.env.NODE_ENV !== 'production' ? 'http://localhost:3000' : '' // TODO: add production server address
const VALID_LANGUAGES = [
	['clike', clike],
	['python', python],
	['dart', dart],
	['crystal', crystal],
	['lua', lua],
	['perl', perl],
	['php', php],
	['fortran', fortran],
	['javascript', javascript],
	['commonlisp', commonlisp],
	['elm', elm],
	['go', go],
	['haskell', haskell],
	['julia', julia],
	['ruby', ruby],
	['swift', swift],
	['rust', rust],
].sort()

const consts = {
	VALID_LANGUAGES,
	SERVER,
}
export default consts
