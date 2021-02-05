# Preval test case

# auto_ident_logic_and_complex_complex.md

> normalize > expressions > statement > for_a > auto_ident_logic_and_complex_complex
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ($($(1)) && $($(2)); $(0); );
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpCallCallee = $;
  const tmpCalleeParam = $(1);
  const tmpIfTest = tmpCallCallee(tmpCalleeParam);
  if (tmpIfTest) {
    const tmpCallCallee$1 = $;
    const tmpCalleeParam$1 = $(2);
    tmpCallCallee$1(tmpCalleeParam$1);
  }
  while (true) {
    const tmpIfTest$1 = $(0);
    if (tmpIfTest$1) {
    } else {
      break;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
let a = { a: 999, b: 1000 };
const tmpCallCallee = $;
const tmpCalleeParam = $(1);
const tmpIfTest = tmpCallCallee(tmpCalleeParam);
if (tmpIfTest) {
  const tmpCallCallee$1 = $;
  const tmpCalleeParam$1 = $(2);
  tmpCallCallee$1(tmpCalleeParam$1);
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

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 2
 - 4: 2
 - 5: 0
 - 6: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
