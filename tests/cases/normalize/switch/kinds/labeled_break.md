# Preval test case

# labeled_break.md

> Normalize > Switch > Kinds > Labeled break
>
> The simple switch is the one where every case ends explicitly, and only once, and where default is either the last case or omitted.

#TODO

## Input

`````js filename=intro
foo: {
  if ($(1)) {
    switch ($(1)) {
      case 0:
        $('one');
        break;
      case 0:
        $('one');
        break foo;
      case 0:
        $('one');
        break;
      case 0:
        $('one');
        break;
    }
    $('fail');
  }
}
$('pass');
`````

## Pre Normal

`````js filename=intro
foo: {
  if ($(1)) {
    tmpSwitchBreak: {
      const tmpSwitchDisc = $(1);
      if (tmpSwitchDisc === 0) {
        $(`one`);
        break tmpSwitchBreak;
      } else if (tmpSwitchDisc === 0) {
        $(`one`);
        break foo;
      } else if (tmpSwitchDisc === 0) {
        $(`one`);
        break tmpSwitchBreak;
      } else if (tmpSwitchDisc === 0) {
        $(`one`);
        break tmpSwitchBreak;
      } else {
      }
    }
    $(`fail`);
  }
}
$(`pass`);
`````

## Normalized

`````js filename=intro
foo: {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    tmpSwitchBreak: {
      const tmpSwitchDisc = $(1);
      const tmpIfTest$1 = tmpSwitchDisc === 0;
      if (tmpIfTest$1) {
        $(`one`);
        break tmpSwitchBreak;
      } else {
        const tmpIfTest$3 = tmpSwitchDisc === 0;
        if (tmpIfTest$3) {
          $(`one`);
          break foo;
        } else {
          const tmpIfTest$5 = tmpSwitchDisc === 0;
          if (tmpIfTest$5) {
            $(`one`);
            break tmpSwitchBreak;
          } else {
            const tmpIfTest$7 = tmpSwitchDisc === 0;
            if (tmpIfTest$7) {
              $(`one`);
              break tmpSwitchBreak;
            } else {
            }
          }
        }
      }
    }
    $(`fail`);
  } else {
  }
}
$(`pass`);
`````

## Output

`````js filename=intro
foo: {
  const tmpIfTest = $(1);
  if (tmpIfTest) {
    const tmpSwitchDisc = $(1);
    const tmpIfTest$1 = tmpSwitchDisc === 0;
    if (tmpIfTest$1) {
      $(`one`);
    } else {
    }
    $(`fail`);
  } else {
  }
}
$(`pass`);
`````

## Globals

None

## Result

Should call `$` with:
 - 1: 1
 - 2: 1
 - 3: 'fail'
 - 4: 'pass'
 - eval returned: undefined

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
