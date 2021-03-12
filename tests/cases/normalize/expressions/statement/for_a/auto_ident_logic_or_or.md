# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > For a > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ($($(0)) || $($(1)) || $($(2)); $(0); );
$(a);
`````

## Pre Normal

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  $($(0)) || $($(1)) || $($(2));
  while ($(0)) {}
}
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(0);
let tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(1);
  tmpIfTest = tmpCallCallee$1(tmpCalleeParam$1);
  if (tmpIfTest) {
  } else {
    const tmpCallCallee$2 = $;
    const tmpCalleeParam$2 = $(2);
    tmpCallCallee$2(tmpCalleeParam$2);
  }
}
while (true) {
  const tmpIfTest$1 = $(0);
  if (tmpIfTest$1) {
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpCalleeParam = $(0);
const tmpIfTest = $(tmpCalleeParam);
if (tmpIfTest) {
} else {
  const tmpCalleeParam$1 = $(1);
  const SSA_tmpIfTest = $(tmpCalleeParam$1);
  if (SSA_tmpIfTest) {
  } else {
    const tmpCalleeParam$2 = $(2);
    $(tmpCalleeParam$2);
  }
}
while (true) {
  const tmpIfTest$1 = $(0);
  if (tmpIfTest$1) {
  } else {
    break;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 0
 - 2: 0
 - 3: 1
 - 4: 1
 - 5: 0
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
