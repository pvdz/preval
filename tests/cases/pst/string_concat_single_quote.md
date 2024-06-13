# Preval test case

# string_concat_single_quote.md

> Pst > String concat single quote

## Input

`````js filename=intro
const here = $("here")
$("this 'thing'" + here + "is 'quoted'");
`````

## Pre Normal


`````js filename=intro
const here = $(`here`);
$(`this 'thing'` + here + `is 'quoted'`);
`````

## Normalized


`````js filename=intro
const here = $(`here`);
const tmpCallCallee = $;
const tmpStringConcatL = $coerce(here, `plustr`);
const tmpBinLhs = `this 'thing'${tmpStringConcatL}`;
const tmpStringConcatR = $coerce(tmpBinLhs, `plustr`);
const tmpCalleeParam = `${tmpStringConcatR}is 'quoted'`;
tmpCallCallee(tmpCalleeParam);
`````

## Output


`````js filename=intro
const here = $(`here`);
const tmpStringConcatL = $coerce(here, `plustr`);
const tmpCalleeParam = `this 'thing'${tmpStringConcatL}is 'quoted'`;
$(tmpCalleeParam);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( "here" );
const b = $coerce( a, "plustr" );
const c = `this 'thing'${tmpStringConcatL}is 'quoted'`;
$( c );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'here'
 - 2: "this 'thing'hereis 'quoted'"
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
