# Preval test case

# auto_ident_arrow.md

> normalize > expressions > statement > for_a > auto_ident_arrow
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let a = { a: 999, b: 1000 };
for (() => {}; $(0); );
$(a);
`````

## Normalized

`````js filename=intro
let a = { a: 999, b: 1000 };
{
  () => {};
  while (true) {
    const tmpIfTest = $(0);
    if (tmpIfTest) {
    } else {
      break;
    }
  }
}
$(a);
`````

## Output

`````js filename=intro
'<skipped>';
`````

## Result

Should call `$` with:
 - 1: 0
 - 2: { a: '999', b: '1000' }
 - eval returned: undefined

Normalized calls: Same

Final output calls: BAD!!
 - eval returned: undefined
