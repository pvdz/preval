# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Assignments > Objlit spread > Auto ident unary typeof simple
>
> Normalization of assignments should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

let a = { a: 999, b: 1000 };
$({ ...(a = typeof arg) });
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
$({ ...(a = typeof arg) });
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
a = typeof arg;
let tmpObjSpread = a;
const tmpCalleeParam = { ...tmpObjSpread };
tmpCallCallee(tmpCalleeParam);
$(a, arg);
`````

## Output


`````js filename=intro
const tmpCalleeParam /*:object*/ = { [`0`]: `n`, [`1`]: `u`, [`2`]: `m`, [`3`]: `b`, [`4`]: `e`, [`5`]: `r` };
$(tmpCalleeParam);
$(`number`, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = {
  [ "0" ]: "n",
  [ "1" ]: "u",
  [ "2" ]: "m",
  [ "3" ]: "b",
  [ "4" ]: "e",
  [ "5" ]: "r",
};
$( a );
$( "number", 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { 0: '"n"', 1: '"u"', 2: '"m"', 3: '"b"', 4: '"e"', 5: '"r"' }
 - 2: 'number', 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
