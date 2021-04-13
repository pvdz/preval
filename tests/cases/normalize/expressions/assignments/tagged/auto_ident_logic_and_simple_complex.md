# Preval test case

# auto_ident_logic_and_simple_complex.md

> Normalize > Expressions > Assignments > Tagged > Auto ident logic and simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = 1 && $($(1)))} after`;
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$`before ${(a = 1 && $($(1)))} after`;
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = ['before ', ' after'];
a = 1;
if (a) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$3 = $(1);
  a = tmpCallCallee$1(tmpCalleeParam$3);
} else {
}
let tmpCalleeParam$1 = a;
tmpCallCallee(tmpCalleeParam, tmpCalleeParam$1);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam = ['before ', ' after'];
let tmpSSA_a = 1;
if (tmpSSA_a) {
  const tmpCalleeParam$3 = $(1);
  tmpSSA_a = $(tmpCalleeParam$3);
} else {
}
const tmpCalleeParam$1 = tmpSSA_a;
$(tmpCalleeParam, tmpCalleeParam$1);
$(tmpSSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: ['before ', ' after'], 1
 - 4: 1
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
