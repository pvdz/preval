# Preval test case

# auto_ident_logic_and_simple_simple.md

> Normalize > Expressions > Statement > Tagged > Auto ident logic and simple simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${1 && 2} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${1 && 2} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1 = 1;
if (tmpCalleeParam$1) {
  tmpCalleeParam$1 = 2;
}
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = ['before ', ' after'];
let tmpCalleeParam$1 = 1;
if (tmpCalleeParam$1) {
  tmpCalleeParam$1 = 2;
}
$(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 2
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
