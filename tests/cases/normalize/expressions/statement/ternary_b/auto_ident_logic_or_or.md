# Preval test case

# auto_ident_logic_or_or.md

> Normalize > Expressions > Statement > Ternary b > Auto ident logic or or
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
$(1) ? $($(0)) || $($(1)) || $($(2)) : $(200);
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(0);
  let tmpIfTest$1 = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest$1) {
  } else {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(1);
    tmpIfTest$1 = tmpCallCallee$1(tmpCalleeParam$1);
    if (tmpIfTest$1) {
    } else {
      const tmpCallCallee$2 = $;
      const tmpCalleeParam$2 = $(2);
      tmpCallCallee$2(tmpCalleeParam$2);
    }
  }
} else {
  $(200);
}
$(a);
`````

## Output

`````js filename=intro
const a = { a: 999, b: 1000 };
const tmpIfTest = $(1);
if (tmpIfTest) {
  const tmpCalleeParam = $(0);
  const tmpIfTest$1 = $(tmpCalleeParam);
  if (tmpIfTest$1) {
  } else {
    const tmpCalleeParam$1 = $(1);
    const SSA_tmpIfTest$1 = $(tmpCalleeParam$1);
    if (SSA_tmpIfTest$1) {
    } else {
      const tmpCalleeParam$2 = $(2);
      $(tmpCalleeParam$2);
    }
  }
} else {
  $(200);
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0
 - 3: 0
 - 4: 1
 - 5: 1
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
