# Preval test case

# auto_ident_logic_and_and.md

> Normalize > Expressions > Assignments > Ternary a > Auto ident logic and and
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && $($(1)) && $($(2))) ? $(100) : $(200));
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
$((a = $($(1)) && $($(1)) && $($(2))) ? $(100) : $(200));
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
let tmpCalleeParam = undefined;
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
let tmpIfTest = a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
}
tmpCallCallee(tmpCalleeParam);
$(a);
`````

## Output

`````js filename=intro
let tmpCalleeParam = undefined;
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
const tmpIfTest = SSA_a;
if (tmpIfTest) {
  tmpCalleeParam = $(100);
} else {
  tmpCalleeParam = $(200);
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
 - 7: 100
 - 8: 100
 - 9: 2
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
