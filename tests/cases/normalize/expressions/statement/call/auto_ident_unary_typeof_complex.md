# Preval test case

# auto_ident_unary_typeof_complex.md

> Normalize > Expressions > Statement > Call > Auto ident unary typeof complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$(typeof $(arg));
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$(typeof $(arg));
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpUnaryArg = $(arg);
const tmpCalleeParam = typeof tmpUnaryArg;
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
const tmpUnaryArg /*:unknown*/ = $(1);
const tmpCalleeParam /*:string*/ = typeof tmpUnaryArg;
$(tmpCalleeParam);
const a /*:object*/ = { a: 999, b: 1000 };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
$( b );
const c = {
  a: 999,
  b: 1000,
};
$( c, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 'number'
 - 3: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
