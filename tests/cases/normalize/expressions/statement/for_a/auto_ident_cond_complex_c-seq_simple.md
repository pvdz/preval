# Preval test case

# auto_ident_cond_complex_c-seq_simple.md

> normalize > expressions > statement > for_a > auto_ident_cond_complex_c-seq_simple
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for ($(1) ? (40, 50, $(60)) : $($(100)); $(0); );
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    40;
    50;
    $(60);
  } else {
    const tmpCallCallee = $;
    const tmpCalleeParam = $(100);
    tmpCallCallee(tmpCalleeParam);
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
const tmpIfTest = $(1);
if (tmpIfTest) {
  $(60);
} else {
  const tmpCallCallee = $;
  const tmpCalleeParam = $(100);
  tmpCallCallee(tmpCalleeParam);
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
 - 2: 60
 - 3: 0
 - 4: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
