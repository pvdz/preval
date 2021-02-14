# Preval test case

# auto_ident_upd_i m_simple.md

> normalize > expressions > assignments > for_b > auto_ident_upd_i m_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

let a = { a: 999, b: 1000 };
for (; (a = b--); $(1));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpPostUpdArgIdent = b;
    b = b - 1;
    a = tmpPostUpdArgIdent;
    let tmpIfTest = a;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = 1;
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpPostUpdArgIdent = b;
    b = b - 1;
    a = tmpPostUpdArgIdent;
    let tmpIfTest = a;
    if (tmpIfTest) {
      $(1);
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 0, -1
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same
