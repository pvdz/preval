# Preval test case

# auto_ident_s-seq.md

> normalize > expressions > statement > for_a > auto_ident_s-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let x = 1;

let a = { a: 999, b: 1000 };
for ($(1), $(2), x; $(0); );
$(a, x);
`````

## Normalized

`````js filename=intro
let x = 1;
let a = { a: 999, b: 1000 };
{
  $(1);
  $(2);
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
let x = 1;
let a = { a: 999, b: 1000 };
{
  $(1);
  $(2);
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
 - 3: 0
 - 4: { a: '999', b: '1000' }, 1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same