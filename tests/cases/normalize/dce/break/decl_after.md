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
  break;
  
  let x = $('fail');
}
$('after');
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
    break;
  } else {
    break;
  }
}
$('after');
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
    break;
  } else {
    break;
  }
}
$('after');
`````

## Result

Should call `$` with:
 - 1: true
 - 2: false
 - 3: 'after'
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same