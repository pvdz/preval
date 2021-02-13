# Preval test case

# decl_after.md

> normalize > dce > return > decl_after
>
> Can we DCE without worrying about things?

We have to be careful not to leave `x` as being an implicit global.

When eliminating dead code we can scan for any declarations and either mark all usages as invalid/dead, or hoist the decl above the return without breaking the TDZ error.

#TODO

## Input

`````js filename=intro
while ($(true)) {
  if ($(false)) x = $('fail too');
  continue;
  
  let x = $('fail');
}
$('after, wont eval due to infinite loop');
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(false);
    if (tmpIfTest$1) {
      x = $('fail too');
    }
    continue;
  } else {
    break;
  }
}
$('after, wont eval due to infinite loop');
`````

## Output

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    const tmpIfTest$1 = $(false);
    if (tmpIfTest$1) {
      x = $('fail too');
    }
    continue;
  } else {
    break;
  }
}
$('after, wont eval due to infinite loop');
`````

## Result

Should call `$` with:
 - 1: true
 - 2: false
 - 3: true
 - 4: false
 - 5: true
 - 6: false
 - 7: true
 - 8: false
 - 9: true
 - 10: false
 - 11: true
 - 12: false
 - 13: true
 - 14: false
 - 15: true
 - 16: false
 - 17: true
 - 18: false
 - 19: true
 - 20: false
 - 21: true
 - 22: false
 - 23: true
 - 24: false
 - 25: true
 - 26: false
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same