# Preval test case

# base.md

> normalize > dce > base
>
> Any statements that follow a return in the same parent should be eliminated.

The do-while transforms by moving code to be at the end of the body. But if there's a continue then this screws up, as this test shows.

Consider

```js
do {
  f();
  continue;
  dce();
} while (g());
```

Then that becomes

```js
let tmp;
do {
  f();
  continue;
  dce();
  tmp = g(); // <-- also dce :(
} while (tmp);
```

Ok then maybe we do transform do-while to regular while loops after all and swallow the extra overhead...

```js
let tmp = true;
while (tmp || g()) {
  tmp = false;
  f();
  continue;
  dce();
}
```

Which then becomes

```js
let tmp = true;
while (tmp || true) {
  let tmp2 = g();
  if (tmp2) {
    tmp = false;
    f();
    continue;
    dce();
  } else {
    break;
  }
}
```

And that would be fine and there's a good chance Preval can eliminate the overhead because it's "simple".

#TODO

## Input

`````js filename=intro
while ($(true)) {
  do {
    $('loop');
    continue;
  } while ($(true));
  $('keep, wont eval due to infinite loop');
}
$('after, wont eval due to infinite loop');
`````

## Normalized

`````js filename=intro
while (true) {
  const tmpIfTest = $(true);
  if (tmpIfTest) {
    let tmpDoWhileFlag = true;
    while (true) {
      let tmpIfTest$1 = tmpDoWhileFlag;
      if (tmpIfTest$1) {
      } else {
        tmpIfTest$1 = $(true);
      }
      if (tmpIfTest$1) {
        tmpDoWhileFlag = false;
        $('loop');
        continue;
      } else {
        break;
      }
    }
    $('keep, wont eval due to infinite loop');
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
    let tmpDoWhileFlag = true;
    while (true) {
      let tmpIfTest$1 = tmpDoWhileFlag;
      if (tmpIfTest$1) {
      } else {
        tmpIfTest$1 = $(true);
      }
      if (tmpIfTest$1) {
        tmpDoWhileFlag = false;
        $('loop');
        continue;
      } else {
        break;
      }
    }
    $('keep, wont eval due to infinite loop');
  } else {
    break;
  }
}
$('after, wont eval due to infinite loop');
`````

## Globals

None

## Result

Should call `$` with:
 - 1: true
 - 2: 'loop'
 - 3: true
 - 4: 'loop'
 - 5: true
 - 6: 'loop'
 - 7: true
 - 8: 'loop'
 - 9: true
 - 10: 'loop'
 - 11: true
 - 12: 'loop'
 - 13: true
 - 14: 'loop'
 - 15: true
 - 16: 'loop'
 - 17: true
 - 18: 'loop'
 - 19: true
 - 20: 'loop'
 - 21: true
 - 22: 'loop'
 - 23: true
 - 24: 'loop'
 - 25: true
 - 26: 'loop'
 - eval returned: ('<crash[ Loop aborted by Preval test runner ]>')

Normalized calls: Same

Final output calls: Same
