# Preval test case

# auto_pattern_obj_complex.md

> Normalize > Expressions > Statement > Tagged > Auto pattern obj complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let { a } = { a: 999, b: 1000 };
$`before ${$({ a: 1, b: 2 })} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let { a: a } = { a: 999, b: 1000 };
$([`before `, ` after`], $({ a: 1, b: 2 }));
$(a);
`````

## Normalized


`````js filename=intro
let bindingPatternObjRoot = { a: 999, b: 1000 };
let a = bindingPatternObjRoot.a;
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
const tmpCallCallee$1 = $;
const tmpCalleeParam$3 = { a: 1, b: 2 };
const tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$3);
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = [`before `, ` after`];
const tmpCalleeParam$3 = { a: 1, b: 2 };
const tmpCalleeParam$1 = $(tmpCalleeParam$3);
$(tmpCalleeParam, tmpCalleeParam$1);
$(999);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
const b = {
  a: 1,
  b: 2,
};
const c = $( b );
$( a, c );
$( 999 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { a: '1', b: '2' }
 - 2: ['before ', ' after'], { a: '1', b: '2' }
 - 3: 999
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
