# Preval test case

# auto_ident_opt_c-seq.md

> normalize > expressions > statement > for_b > auto_ident_opt_c-seq
>
> Normalization of all kinds of expressions should work the same no matter where they are

#TODO

## Input

`````js filename=intro
let b = { x: 1 };

let a = { a: 999, b: 1000 };
for (; (1, 2, $(b))?.x; $(1));
$(a);
`````

## Normalized

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootProp = $(b);
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.x;
    tmpIfTest = tmpChainElementObject;
  }
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Output

`````js filename=intro
let b = { x: 1 };
let a = { a: 999, b: 1000 };
while (true) {
  let tmpIfTest = undefined;
  const tmpChainRootProp = $(b);
  const tmpIfTest$1 = tmpChainRootProp != null;
  if (tmpIfTest$1) {
    const tmpChainElementObject = tmpChainRootProp.x;
    tmpIfTest = tmpChainElementObject;
  }
  if (tmpIfTest) {
    $(1);
  } else {
    break;
  }
}
$(a);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: { x: '1' }
 - 2: 1
 - 3: { x: '1' }
 - 4: 1
 - 5: { x: '1' }
 - 6: 1
 - 7: { x: '1' }
 - 8: 1
 - 9: { x: '1' }
 - 10: 1
 - 11: { x: '1' }
 - 12: 1
 - 13: { x: '1' }
 - 14: 1
 - 15: { x: '1' }
 - 16: 1
 - 17: { x: '1' }
 - 18: 1
 - 19: { x: '1' }
 - 20: 1
 - 21: { x: '1' }
 - 22: 1
 - 23: { x: '1' }
 - 24: 1
 - 25: { x: '1' }
 - 26: 1
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
