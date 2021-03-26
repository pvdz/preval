# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Logic or left > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && $($(1)) && $($(2))) || $(100));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && $($(1)) && $($(2))) || $(100));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCallCallee$1 = $;
const tmpCalleeParam$1 = $(1);
a = tmpCallCallee$1(tmpCalleeParam$1);
if (a) {
  const tmpCallCallee$3 = $;
  const tmpCalleeParam$3 = $(1);
  a = tmpCallCallee$3(tmpCalleeParam$3);
  if (a) {
    const tmpCallCallee$5 = $;
    const tmpCalleeParam$5 = $(2);
    a = tmpCallCallee$5(tmpCalleeParam$5);
  }
}
let tmpCalleeParam = a;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = $(100);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
const tmpCalleeParam$1 = $(1);
let SSA_a = $(tmpCalleeParam$1);
if (SSA_a) {
  const tmpCalleeParam$3 = $(1);
  SSA_a = $(tmpCalleeParam$3);
  if (SSA_a) {
    const tmpCalleeParam$5 = $(2);
    SSA_a = $(tmpCalleeParam$5);
  }
}
let tmpCalleeParam = SSA_a;
if (tmpCalleeParam) {
} else {
  tmpCalleeParam = $(100);
}
$(tmpCalleeParam);
$(SSA_a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 1
 - 4: 1
 - 5: 2
 - 6: 2
 - 7: 2
 - 8: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
