# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Statement > Tagged > Auto ident logic and simple complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${1 && $($(1))} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let a = { a: 999, b: 1000 };
$([`before `, ` after`], 1 && $($(1)));
$(a);
`````

## Normalized


`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
let tmpCalleeParam$1 = 1;
if (tmpCalleeParam$1) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$3 = $(1);
  tmpCalleeParam$1 = tmpCallCallee$1(tmpCalleeParam$3);
} else {
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam$3 = $(1);
const tmpCalleeParam$1 = $(tmpCalleeParam$3);
const tmpCalleeParam = [`before `, ` after`];
$(tmpCalleeParam, tmpCalleeParam$1);
const a = { a: 999, b: 1000 };
$(a);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = $( a );
const c = [ "before ", " after" ];
$( c, b );
const d = {
  a: 999,
  b: 1000,
};
$( d );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: ['before ', ' after'], 1
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
