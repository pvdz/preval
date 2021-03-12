# Preval test case

# auto_ident_array_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident array simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = [1, 2, 3])} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = [1, 2, 3])} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
a = [1, 2, 3];
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['before ', ' after'];
const SSA_a = [1, 2, 3];
$(tmpCalleeParam, SSA_a);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 
  ['before ', ' after'],
  [1, 2, 3],

 - 2: [1, 2, 3]
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
