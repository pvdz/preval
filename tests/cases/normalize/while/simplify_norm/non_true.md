# Preval test case

# non_true.md

> Normalize > While > Simplify norm > Non true
>
> Try to undo some of the damage that was necessary during loop normalizations

#TODO

## Input

`````js filename=intro
while (x) {
  const tmpIfTest = $('yes');
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## Pre Normal


`````js filename=intro
while (x) {
  const tmpIfTest = $(`yes`);
  if (tmpIfTest) {
  } else {
    break;
  }
}
`````

## Normalized


`````js filename=intro
while (true) {
  if (x) {
    const tmpIfTest = $(`yes`);
    if (tmpIfTest) {
    } else {
      break;
    }
  } else {
    break;
  }
}
`````

## Output


`````js filename=intro
if (x) {
  const tmpIfTest = $(`yes`);
  if (tmpIfTest) {
    while ($LOOP_UNROLL_10) {
      if (x) {
        const tmpIfTest$1 = $(`yes`);
        if (tmpIfTest$1) {
        } else {
          break;
        }
      } else {
        break;
      }
    }
  } else {
  }
} else {
}
`````

## PST Output

With rename=true

`````js filename=intro
if (x) {
  const a = $( "yes" );
  if (a) {
    while ($LOOP_UNROLL_10) {
      if (x) {
        const b = $( "yes" );
        if (b) {

        }
        else {
          break;
        }
      }
      else {
        break;
      }
    }
  }
}
`````

## Globals

BAD@! Found 1 implicit global bindings:

x

## Result

Should call `$` with:
 - eval returned: ('<crash[ <ref> is not defined ]>')

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
