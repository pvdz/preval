# Preval test case

# auto_ident_call_computed_simple_complex.md

> Normalize > Expressions > Statement > Throw > Auto ident call computed simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { $ };

let a = { a: 999, b: 1000 };
throw b[$("$")](1);
$(a);
`````

## Pre Normal

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
throw b[$(`\$`)](1);
$(a);
`````

## Normalized

`````js filename=intro
let b = { $: $ };
let a = { a: 999, b: 1000 };
const tmpCallCompObj = b;
const tmpCallCompProp = $(`\$`);
const tmpThrowArg = tmpCallCompObj[tmpCallCompProp](1);
throw tmpThrowArg;
`````

## Output

`````js filename=intro
const tmpCallCompProp = $(`\$`);
const b = { $: $ };
const tmpThrowArg = b[tmpCallCompProp](1);
throw tmpThrowArg;
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "$" );
const b = { $: $ };
const c = b[ a ]( 1 )};
throw c;
`````

## Globals

None

## Result

Should call `$` with:
 - 1: '$'
 - 2: 1
 - eval returned: ('<crash[ 1 ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
