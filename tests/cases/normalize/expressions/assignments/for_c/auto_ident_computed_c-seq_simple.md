# Preval test case

# auto_ident_computed_c-seq_simple.md

> normalize > expressions > assignments > for_c > auto_ident_computed_c-seq_simple
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; $(1); a = (1, 2, $(b))[$("c")]);
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpAssignRhsCompObj = $(b);
      const tmpAssignRhsCompProp = $('c');
      a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Output

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
{
  while (true) {
    const tmpIfTest = $(1);
    if (tmpIfTest) {
      const tmpAssignRhsCompObj = $(b);
      const tmpAssignRhsCompProp = $('c');
      a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
    } else {
      break;
    }
  }
}
$(a, b);
`````

## Result

Should call `$` with:
 - 1: 1
 - 2: { c: '1' }
 - 3: 'c'
 - 4: 1
 - 5: { c: '1' }
 - 6: 'c'
 - 7: 1
 - 8: { c: '1' }
 - 9: 'c'
 - 10: 1
 - 11: { c: '1' }
 - 12: 'c'
 - 13: 1
 - 14: { c: '1' }
 - 15: 'c'
 - 16: 1
 - 17: { c: '1' }
 - 18: 'c'
 - 19: 1
 - 20: { c: '1' }
 - 21: 'c'
 - 22: 1
 - 23: { c: '1' }
 - 24: 'c'
 - 25: 1
 - 26: { c: '1' }
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same