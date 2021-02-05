# Preval test case

# auto_ident_ident_ident.md

> normalize > expressions > statement > for_a > auto_ident_ident_ident
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = 1,
  c = 2;

let a = { a: 999, b: 1000 };
for (b = 2; $(0); );
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 1;
let c = 2;
let a = { a: 999, b: 1000 };
{
  b = 2;
  while (true) {
    const tmpIfTest = $(0);
    if (tmpIfTest) {
    } else {
      break;
    }
  }
}
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
b = 2;
while (true) {
  const tmpIfTest = $(0);
  if (tmpIfTest) {
  } else {
    break;
  }
}
$(a, b, 2);
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: { a: '999', b: '1000' }, 2, 2
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
