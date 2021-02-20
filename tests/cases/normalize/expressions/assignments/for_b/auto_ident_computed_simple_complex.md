# Preval test case

# auto_ident_computed_simple_complex.md

> Normalize > Expressions > Assignments > For b > Auto ident computed simple complex
>
> Normalization of assignments should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

let a = { a: 999, b: 1000 };
for (; (a = b[$("c")]); $(1));
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpAssignRhsCompObj = b;
  const tmpAssignRhsCompProp = $('c');
  a = tmpAssignRhsCompObj[tmpAssignRhsCompProp];
  let tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  const tmpAssignRhsCompProp = $('c');
  a = b[tmpAssignRhsCompProp];
  const tmpIfTest = a;
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 'c'
 - 2: 1
 - 3: 'c'
 - 4: 1
 - 5: 'c'
 - 6: 1
 - 7: 'c'
 - 8: 1
 - 9: 'c'
 - 10: 1
 - 11: 'c'
 - 12: 1
 - 13: 'c'
 - 14: 1
 - 15: 'c'
 - 16: 1
 - 17: 'c'
 - 18: 1
 - 19: 'c'
 - 20: 1
 - 21: 'c'
 - 22: 1
 - 23: 'c'
 - 24: 1
 - 25: 'c'
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
