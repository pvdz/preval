# Preval test case

# auto_ident_delete_prop_s-seq.md

> Normalize > Expressions > Statement > Binary right > Auto ident delete prop s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$(100) + delete ($(1), $(2), arg).y;
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$(100) + delete ($(1), $(2), arg).y;
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
$(1);
$(2);
const tmpDeleteObj = arg;
const tmpBinBothRhs = delete tmpDeleteObj.y;
tmpBinBothLhs + tmpBinBothRhs;
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const a = { a: 999, b: 1000 };
const tmpBinBothLhs = $(100);
$(1);
$(2);
const tmpBinBothRhs = delete arg.y;
tmpBinBothLhs + tmpBinBothRhs;
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = {
a: 999,
b: 1000
;
const c = $( 100 );
$( 1 );
$( 2 );
const d = deletea.y;
c + d;
$( b, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 100
 - 2: 1
 - 3: 2
 - 4: { a: '999', b: '1000' }, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
