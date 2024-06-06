# Preval test case

# auto_ident_opt_s-seq.md

> Normalize > Expressions > Assignments > Tagged > Auto ident opt s-seq
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
$`before ${(a = (1, 2, b)?.x)} after`;
$(a);
`````

## Pre Normal


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
$([`before `, ` after`], (a = (1, 2, b)?.x));
$(a);
`````

## Normalized


`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = [`before `, ` after`];
a = undefined;
const tmpChainRootProp = b;
const tmpIfTest = tmpChainRootProp != null;
if (tmpIfTest) {
  const tmpChainElementObject = tmpChainRootProp.x;
  a = tmpChainElementObject;
} else {
}
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output


`````js filename=intro
const tmpCalleeParam = [`before `, ` after`];
$(tmpCalleeParam, 1);
$(1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = [ "before ", " after" ];
$( a, 1 );
$( 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 1
 - 2: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
