# Preval test case

# auto_ident_delete_computed_s-seq_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident delete computed s-seq complex
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
$`before ${(a = delete ($(1), $(2), arg)[$("y")])} after`;
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = delete ($(1), $(2), arg)[$(`y`)]));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
$(1);
$(2);
const tmpDeleteCompObj = arg;
const tmpDeleteCompProp = $(`y`);
a = delete tmpDeleteCompObj[tmpDeleteCompProp];
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a, arg);
`````

## Output


`````js filename=intro
const arg = { y: 1 };
const tmpCalleeParam = [`before `, ` after`];
$(1);
$(2);
const tmpDeleteCompProp = $(`y`);
const a = delete arg[tmpDeleteCompProp];
$(tmpCalleeParam, a);
$(a, arg);
`````

## PST Output

With rename=true

`````js filename=intro
const a = { y: 1 };
const b = [ "before ", " after" ];
$( 1 );
$( 2 );
const c = $( "y" );
const d = delete a[ c ];
$( b, d );
$( d, a );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: 'y'
 - 4: ['before ', ' after'], true
 - 5: true, {}
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
