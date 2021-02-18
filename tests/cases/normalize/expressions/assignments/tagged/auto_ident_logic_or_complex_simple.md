# Preval test case

# auto_ident_logic_or_complex_simple.md

> normalize > expressions > assignments > tagged > auto_ident_logic_or_complex_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = $($(0)) || 2)} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
const tmpCallCallee$1 = $;
const tmpCalleeParam$2 = $(0);
a = tmpCallCallee$1(tmpCalleeParam$2);
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
const tmpCalleeParam$2 = $(0);
let SSA_a = $(tmpCalleeParam$2);
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
 - 1: 0
 - 2: 0
 - 3: ['before ', ' after'], 2
 - 4: 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
