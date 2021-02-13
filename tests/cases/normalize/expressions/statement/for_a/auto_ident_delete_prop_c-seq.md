# Preval test case

# auto_ident_delete_prop_c-seq.md

> normalize > expressions > statement > for_a > auto_ident_delete_prop_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let arg = { y: 1 };

let a = { a: 999, b: 1000 };
for (delete ($(1), $(2), $(arg)).y; $(0); );
$(a, x);
`````

## Normalized

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  delete tmpDeleteObj.y;
  while (true) {
    const tmpIfTest = $(0);
    if (tmpIfTest) {
    } else {
      break;
    }
  }
}
$(a, x);
`````

## Output

`````js filename=intro
let arg = { y: 1 };
let a = { a: 999, b: 1000 };
{
  $(1);
  $(2);
  const tmpDeleteObj = $(arg);
  delete tmpDeleteObj.y;
  while (true) {
    const tmpIfTest = $(0);
    if (tmpIfTest) {
    } else {
      break;
    }
  }
}
$(a, x);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: 2
 - 3: { y: '1' }
 - 4: 0
 - 5: { a: '999', b: '1000' }, undefined
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
