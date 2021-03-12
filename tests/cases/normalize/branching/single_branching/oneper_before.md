# Preval test case

# oneper_before.md

> Normalize > Branching > Single branching > Oneper before
>
> One branch per func?

#TODO

This is the example input

The test is what that would roughly translate to for single branching functions

## Input

`````js filename=intro
const X = function (a, b, c, d, e) {
  const f = a.length;
  const g = 0 === f;
  if (g) {
    return -1;
  } else {
    const h = typeof c;
    const i = 'string' == h;
    if (i) {
      d = c;
      c = 'no';
    } else {
      const j = 2147483647 < c;
      if (j) {
        c = 2147483647;
      } else {
        const k = -2147483648 > c;
        if (k) {
          c = -2147483648;
        }
      }
    }
    let l = +c;
    const m = isNaN(l);
    if (m) {
      const n = a.length;
      l = n - 1;
      $(a, b, c, d, e, f, g, h, i, l, m);
    }
  }
}
X('a', 'b', 'c', 'd', 'e');
`````

## Normalized

`````js filename=intro
const X = function (a, b, c, d, e) {
  const f = a.length;
  const g = 0 === f;
  if (g) {
    return -1;
  } else {
    const h = typeof c;
    const i = 'string' == h;
    if (i) {
      d = c;
      c = 'no';
    } else {
      const j = 2147483647 < c;
      if (j) {
        c = 2147483647;
      } else {
        const k = -2147483648 > c;
        if (k) {
          c = -2147483648;
        }
      }
    }
    let l = +c;
    const m = isNaN(l);
    if (m) {
      const n = a.length;
      l = n - 1;
      $(a, b, c, d, e, f, g, h, i, l, m);
    }
  }
};
X('a', 'b', 'c', 'd', 'e');
`````

## Output

`````js filename=intro
const X = function (a, b, c, d, e) {
  const f = a.length;
  const g = 0 === f;
  if (g) {
    return -1;
  } else {
    const h = typeof c;
    const i = 'string' == h;
    if (i) {
      d = c;
      c = 'no';
    } else {
      const j = 2147483647 < c;
      if (j) {
        c = 2147483647;
      } else {
        const k = -2147483648 > c;
        if (k) {
          c = -2147483648;
        }
      }
    }
    const l = +c;
    const m = isNaN(l);
    if (m) {
      const n = a.length;
      const SSA_l = n - 1;
      $(a, b, c, d, e, f, g, h, i, SSA_l, m);
    }
  }
};
X('a', 'b', 'c', 'd', 'e');
`````

## Globals

BAD@! Found 1 implicit global bindings:

isNaN

## Result

Should call `$` with:
 - 1: 'a', 'b', 'no', 'c', 'e', 1, false, 'string', true, 0, true
 - eval returned: undefined

Normalized calls: Same

Final output calls: Same