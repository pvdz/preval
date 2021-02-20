# Preval test case

# auto_ident_logic_or_simple_simple.md

> Normalize > Expressions > Assignments > Tagged > Auto ident logic or simple simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = 0 || 2)} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
a = 0;
if (a) {
} else {
  a = 2;
}
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['before ', ' after'];
let SSA_a = 0;
if (SSA_a) {
} else {
  SSA_a = 2;
}
const tmpCalleeParam$1 = SSA_a;
$(tmpCalleeParam, tmpCalleeParam$1);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: ['before ', ' after'], 2
 - 2: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
